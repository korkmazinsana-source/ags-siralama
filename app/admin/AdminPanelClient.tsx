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
