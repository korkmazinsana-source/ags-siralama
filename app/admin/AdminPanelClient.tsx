"use client";
import React, { useMemo, useState } from "react";

type Row = { tracking_code?: string | null; ags: number; oabt: number; score: number; created_at?: string | null };

export default function AdminPanelClient({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"created_at" | "score" | null>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = query.trim().toUpperCase();
    let out = rows.slice();
    if (q) out = out.filter((r) => (r.tracking_code || "").toUpperCase().includes(q));
    if (sortKey) {
      out.sort((a, b) => {
        const av: any = a[sortKey] ?? 0;
        const bv: any = b[sortKey] ?? 0;
        if (av === bv) return 0;
        return sortDir === "asc" ? (av < bv ? -1 : 1) : av > bv ? -1 : 1;
      });
    }
    return out;
  }, [rows, query, sortKey, sortDir]);

  const downloadCSV = (asExcel = false) => {
    const headers = ["tracking_code", "ags", "oabt", "score", "created_at"];
    const lines = [headers.join(",")].concat(
      filtered.map((r) => `${r.tracking_code || ""},${r.ags},${r.oabt},${r.score},${r.created_at || ""}`)
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = asExcel ? "scores.xlsx" : "scores.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // basic inline histogram generator
  const histogram = (values: number[], bins = 10) => {
    if (values.length === 0) return new Array(bins).fill(0);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const size = (max - min) / bins || 1;
    const counts = new Array(bins).fill(0);
    values.forEach((v) => {
      const idx = Math.min(bins - 1, Math.floor((v - min) / size));
      counts[idx]++;
    });
    return counts;
  };

  const agsVals = rows.map((r) => r.ags);
  const oabtVals = rows.map((r) => r.oabt);
  const scoreVals = rows.map((r) => r.score);
  const daily = rows.reduce<Record<string, number>>((acc, r) => {
    const d = r.created_at ? new Date(r.created_at).toISOString().slice(0, 10) : "unknown";
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});

  // Assignment simulation state and computations
  const [assignCount, setAssignCount] = useState<number>(2000);

  const sortedByScoreDesc = useMemo(() => rows.slice().sort((a, b) => b.score - a.score), [rows]);

  const totalParticipants = rows.length;
  const avgScore = totalParticipants ? (scoreVals.reduce((s, v) => s + v, 0) / totalParticipants) : 0;

  const scoreBuckets = useMemo(() => {
    const buckets: { range: string; min: number; max: number; count: number }[] = [
      { range: "90-100", min: 90, max: 100, count: 0 },
      { range: "85-90", min: 85, max: 90, count: 0 },
      { range: "80-85", min: 80, max: 85, count: 0 },
      { range: "75-80", min: 75, max: 80, count: 0 },
      { range: "70-75", min: 70, max: 75, count: 0 },
      { range: "<70", min: -Infinity, max: 70, count: 0 },
    ];
    rows.forEach((r) => {
      for (const b of buckets) {
        if (r.score >= b.min && r.score < b.max) {
          b.count++;
          break;
        }
      }
    });
    return buckets;
  }, [rows]);

  const cutoff = useMemo(() => {
    if (assignCount <= 0 || sortedByScoreDesc.length === 0) return null;
    const idx = Math.min(assignCount, sortedByScoreDesc.length) - 1;
    return sortedByScoreDesc[idx]?.score ?? null;
  }, [assignCount, sortedByScoreDesc]);

  const cutoffDensity = useMemo(() => {
    if (cutoff === null) return 0;
    const low = cutoff - 0.5;
    const high = cutoff + 0.5;
    return rows.filter((r) => r.score >= low && r.score <= high).length;
  }, [cutoff, rows]);

  const agsNetBuckets = useMemo(() => {
    const buckets = [
      { label: "70+", count: 0 },
      { label: "60-70", count: 0 },
      { label: "50-60", count: 0 },
      { label: "<50", count: 0 },
    ];
    rows.forEach((r) => {
      const v = r.ags;
      if (v >= 70) buckets[0].count++;
      else if (v >= 60) buckets[1].count++;
      else if (v >= 50) buckets[2].count++;
      else buckets[3].count++;
    });
    return buckets;
  }, [rows]);

  const oabtNetBuckets = useMemo(() => {
    const buckets = [
      { label: "45+", count: 0 },
      { label: "40-45", count: 0 },
      { label: "35-40", count: 0 },
      { label: "30-35", count: 0 },
      { label: "<30", count: 0 },
    ];
    rows.forEach((r) => {
      const v = r.oabt;
      if (v >= 45) buckets[0].count++;
      else if (v >= 40) buckets[1].count++;
      else if (v >= 35) buckets[2].count++;
      else if (v >= 30) buckets[3].count++;
      else buckets[4].count++;
    });
    return buckets;
  }, [rows]);

  const autoComment = useMemo(() => {
    const highest = scoreBuckets.reduce((a, b) => (a.count >= b.count ? a : b));
    if (!highest) return "";
    const approx = cutoff !== null ? `Tahmini kapanış: ${cutoff.toFixed(2)} (yaklaşık)` : "";
    return `Mevcut verilere göre aday yoğunluğu ${highest.range} puan aralığında görülmektedir. ${assignCount} kişilik atama senaryosunda ${approx} bu bölgede oluşabilir.`;
  }, [scoreBuckets, cutoff, assignCount]);

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <input placeholder="Takip kodu ara" value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 rounded-md border px-3 py-2" />
        <select value={sortKey || ""} onChange={(e) => setSortKey((e.target.value as any) || null)} className="rounded-md border px-3 py-2">
          <option value="created_at">Tarih</option>
          <option value="score">Puan</option>
        </select>
        <button onClick={() => setSortDir((s) => (s === "asc" ? "desc" : "asc"))} className="rounded-md bg-slate-200 px-3">{sortDir}</button>
        <button onClick={() => downloadCSV(false)} className="rounded-md bg-sky-500 text-white px-3">CSV indir</button>
        <button onClick={() => downloadCSV(true)} className="rounded-md bg-sky-600 text-white px-3">Excel indir</button>
      </div>

      <div className="grid gap-4 mb-6 sm:grid-cols-2">
        <div className="p-4 bg-white rounded">AGS dağılım
          <div className="mt-2 h-24 w-full bg-slate-100">
            {/* simple bars */}
            <div className="flex h-full items-end gap-1 px-1">
              {histogram(agsVals, 12).map((v, i) => <div key={i} style={{ height: `${(v / Math.max(...histogram(agsVals,12)))*100 || 0}%` }} className="bg-sky-500 w-full"></div>)}
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded">ÖABT dağılım
          <div className="mt-2 h-24 w-full bg-slate-100">
            <div className="flex h-full items-end gap-1 px-1">
              {histogram(oabtVals, 12).map((v, i) => <div key={i} style={{ height: `${(v / Math.max(...histogram(oabtVals,12)))*100 || 0}%` }} className="bg-sky-500 w-full"></div>)}
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded">Puan dağılım
          <div className="mt-2 h-24 w-full bg-slate-100">
            <div className="flex h-full items-end gap-1 px-1">
              {histogram(scoreVals, 12).map((v, i) => <div key={i} style={{ height: `${(v / Math.max(...histogram(scoreVals,12)))*100 || 0}%` }} className="bg-sky-500 w-full"></div>)}
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded">Günlük girişler
          <div className="mt-2 text-sm text-slate-600">
            {Object.entries(daily).slice(0, 14).map(([d, c]) => <div key={d} className="flex justify-between"><span>{d}</span><span>{c}</span></div>)}
          </div>
        </div>
      </div>

      <section className="rounded-[1.5rem] bg-white p-4 mb-6 shadow">
        <h3 className="text-lg font-semibold">Atama Simülasyonu ve Veri Analizi</h3>
        <div className="mt-3 flex items-center gap-3">
          <label className="text-sm">Atama Sayısı:</label>
          <input
            type="number"
            value={assignCount}
            onChange={(e) => setAssignCount(Number(e.target.value || 0))}
            min={0}
            className="rounded-md border px-2 py-1 w-36"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
          <div>Toplam katılımcı: <b>{totalParticipants}</b></div>
          <div>Ortalama puan: <b>{avgScore.toFixed(2)}</b></div>
          <div>En yüksek puan: <b>{(Math.max(...(scoreVals.length?scoreVals:[0]))).toFixed(2)}</b></div>
          <div>En düşük puan: <b>{(Math.min(...(scoreVals.length?scoreVals:[0]))).toFixed(2)}</b></div>
          <div>Kesme puanı (tahmin): <b>{cutoff !== null ? cutoff.toFixed(2) : "—"}</b></div>
          <div>Aynı civarda aday sayısı: <b>{cutoffDensity}</b></div>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Puan dağılımı</h4>
            <div className="mt-2">
              {scoreBuckets.map((b) => (
                <div key={b.range} className="flex justify-between text-sm py-1 border-b border-slate-100">
                  <span>{b.range}</span>
                  <span className="font-medium">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Net analizleri</h4>
            <div className="mt-2">
              <div className="text-sm font-medium">AGS</div>
              {agsNetBuckets.map((b) => (
                <div key={b.label} className="flex justify-between text-sm py-1 border-b border-slate-100">
                  <span>{b.label}</span>
                  <span className="font-medium">{b.count}</span>
                </div>
              ))}

              <div className="text-sm font-medium mt-3">ÖABT</div>
              {oabtNetBuckets.map((b) => (
                <div key={b.label} className="flex justify-between text-sm py-1 border-b border-slate-100">
                  <span>{b.label}</span>
                  <span className="font-medium">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm italic text-slate-600">{autoComment}</div>
      </section>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-2">Takip kodu</th>
              <th className="px-3 py-2">AGS</th>
              <th className="px-3 py-2">ÖABT</th>
              <th className="px-3 py-2">Puan</th>
              <th className="px-3 py-2">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <tr key={idx} className="odd:bg-slate-50">
                <td className="px-3 py-2">{r.tracking_code || "-"}</td>
                <td className="px-3 py-2">{r.ags}</td>
                <td className="px-3 py-2">{r.oabt}</td>
                <td className="px-3 py-2">{r.score.toFixed(2)}</td>
                <td className="px-3 py-2">{r.created_at ? new Date(r.created_at).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
