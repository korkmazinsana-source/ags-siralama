"use client";

import { type FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

type ResultStats = {
  score: number;
  rank: number;
  percentileLabel: string;
  totalParticipants: number;
  avgAgs: number;
  avgOabt: number;
  avgScore: number;
  maxScore: number;
};

const STORAGE_KEY = "ags-scores-device-uuid";

const getOrCreateUuid = (): string => {
  const existingUuid = localStorage.getItem(STORAGE_KEY);
  if (existingUuid) {
    return existingUuid;
  }

  const newUuid =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).substring(2)}`;

  localStorage.setItem(STORAGE_KEY, newUuid);
  return newUuid;
};

export default function Home() {
  const [ags, setAgs] = useState("");
  const [oabt, setOabt] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultStats | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setResult(null);

    const agsValue = Number(String(ags).replace(",", "."));
    const oabtValue = Number(String(oabt).replace(",", "."));

    if (Number.isNaN(agsValue) || Number.isNaN(oabtValue)) {
      setMessage("Lütfen AGS ve ÖABT alanlarına geçerli sayılar girin.");
      return;
    }

    const isQuarterStep = (value: number) =>
      Math.abs(value * 4 - Math.round(value * 4)) < 0.000001;

    if (!isQuarterStep(agsValue) || !isQuarterStep(oabtValue)) {
      setMessage("Net değeri yalnızca ,00, ,25, ,50 veya ,75 ile bitebilir.");
      return;
    }

    if (agsValue < 0 || agsValue > 80) {
      setMessage("AGS 0 ile 80 arasında olmalıdır.");
      return;
    }

    if (oabtValue < 0 || oabtValue > 50) {
      setMessage("ÖABT 0 ile 50 arasında olmalıdır.");
      return;
    }

    const score = (agsValue / 80) * 50 + (oabtValue / 50) * 50;
    const uuid = getOrCreateUuid();
    setLoading(true);

    const { data: existing, error: existingError } = await supabase
      .from("scores")
      .select("uuid")
      .eq("uuid", uuid)
      .maybeSingle();

    if (existingError) {
      setLoading(false);
      setMessage(
        `Kayıt kontrolü sırasında bir hata oluştu: ${existingError.message || "Lütfen tekrar deneyin."}`
      );
      return;
    }

    if (existing) {
      setLoading(false);
      setMessage("Bu cihazdan daha önce veri girişi yapılmıştır.");
      return;
    }

    const insertResult = await supabase.from("scores").insert([
      {
        uuid,
        ags: agsValue,
        oabt: oabtValue,
        score,
      },
    ]);

    if (insertResult.error) {
      setLoading(false);
      setMessage(
        `Kayıt sırasında bir hata oluştu: ${insertResult.error.message || "Lütfen tekrar deneyin."}`
      );
      return;
    }

    const { data: scores, error: fetchError } = await supabase
      .from("scores")
      .select("ags,oabt,score");

    setLoading(false);

    if (fetchError || !scores) {
      setMessage(
        `Kayıt başarılı, ancak sonuçlar yüklenemedi: ${fetchError?.message || "Lütfen sayfayı yenileyin."}`
      );
      setAgs("");
      setOabt("");
      return;
    }

    const totalParticipants = scores.length;
    const avgAgs = scores.reduce((sum, item) => sum + Number(item.ags), 0) / totalParticipants;
    const avgOabt = scores.reduce((sum, item) => sum + Number(item.oabt), 0) / totalParticipants;
    const avgScore = scores.reduce((sum, item) => sum + Number(item.score), 0) / totalParticipants;
    const maxScore = Math.max(...scores.map((item) => Number(item.score)));
    const higherCount = scores.filter((item) => Number(item.score) > score).length;
    const rank = higherCount + 1;
    const percentile = Math.round((rank / totalParticipants) * 100);
    const percentileLabel = `İlk %${percentile}`;

    setResult({
      score,
      rank,
      percentileLabel,
      totalParticipants,
      avgAgs,
      avgOabt,
      avgScore,
      maxScore,
    });

    setMessage("Kayıt başarıyla oluşturuldu.");
    setAgs("");
    setOabt("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-slate-100 to-white px-4 py-12 font-sans text-slate-900">
      <main className="w-full max-w-3xl space-y-8 rounded-[2rem] bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10">
        <div className="rounded-[1.75rem] bg-slate-950/95 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.18)] text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.24em] text-sky-300">
            2026 Özel Eğitim AGS Tahmini Sıralama Sistemi
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            AGS ve ÖABT ile tahmini sıralamanızı hızla görün.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            AGS ve ÖABT netlerinizi girerek diğer Özel Eğitim öğretmen adayları arasındaki tahmini sıralamanızı hesaplayabilirsiniz.
          </p>
        </div>

        <div className="rounded-[1.75rem] bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-6 shadow-[0_20px_70px_rgba(14,165,233,0.2)] text-white transition sm:p-8">
          <div className="space-y-4 sm:flex sm:items-start sm:justify-between sm:gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                Özel Eğitim Atama ve Taban Puan Telegram Kanalı
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                Özel Eğitim Atama ve Taban Puan Telegram Kanalı
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-sky-100/90 sm:text-base">
                Özel Eğitim öğretmen atamalarıyla ilgili son gelişmeleri, tahmini atama sayılarını, AGS puan analizlerini, tahmini taban puanları ve kaç netle atanılabileceğine dair değerlendirmeleri Telegram kanalımızda paylaşıyoruz.
              </p>
              <p className="mt-4 rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-sky-500/20">
                ATAMA DURUMU, TABAN PUANLAR VE GÜNCEL ANALİZLER İÇİN TELEGRAM KANALIMIZA KATILIN
              </p>
            </div>
            <a
              href="https://t.me/ozelegitim2027"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-3xl bg-white text-slate-950 transition hover:bg-slate-100"
            >
              Telegram Kanalına Katıl
            </a>
          </div>
        </div>

        <div className="grid gap-6 rounded-[1.5rem] bg-slate-50 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-[0_18px_40px_rgba(14,165,233,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-500">
                AGS & ÖABT Hesaplama
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                Netlerinizi girin, puanınızı hesaplayın ve kaydedin.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Mevcut sistem çalışır halde kalacak. Hesaplama ve kayıt işlemleri Supabase üzerinden güvenli şekilde yapılır.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-[0_18px_40px_rgba(14,165,233,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
              Hızlı Bilgi
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              Kaydınızı şimdi oluşturarak anında sonuç alın.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Telefon veya tablet kullanıyor olsanız bile modern bir deneyim sağlanır; mobil uyumlu form ve görsel bilgilendirme ile kolay kullanım.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 rounded-[1.5rem] bg-slate-950 p-8 shadow-[0_30px_90px_rgba(14,165,233,0.14)] text-white">
          <label className="grid gap-3 text-sm font-medium text-slate-100">
            AGS Neti
            <input
              value={ags}
              onChange={(event) => setAgs(event.target.value)}
              type="number"
              inputMode="decimal"
              min="0"
              max="80"
              step="0.25"
              placeholder="0 - 80"
              className="h-14 rounded-3xl border border-sky-500/20 bg-slate-900/90 px-4 text-base text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20"
            />
          </label>

          <label className="grid gap-3 text-sm font-medium text-slate-100">
            ÖABT Neti
            <input
              value={oabt}
              onChange={(event) => setOabt(event.target.value)}
              type="number"
              inputMode="decimal"
              min="0"
              max="50"
              step="0.25"
              placeholder="0 - 50"
              className="h-14 rounded-3xl border border-sky-500/20 bg-slate-900/90 px-4 text-base text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/20"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-14 items-center justify-center rounded-3xl bg-sky-500 px-6 text-base font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Kaydediliyor..." : "Sonucumu Hesapla"}
          </button>

          {message ? (
            <div className="rounded-3xl border border-sky-200/20 bg-white/10 px-4 py-4 text-sm text-slate-100">
              {message}
            </div>
          ) : null}

          {result ? (
            <section className="grid gap-6 rounded-[1.5rem] bg-white p-6 text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-[0_18px_40px_rgba(14,165,233,0.12)] sm:col-span-2">
                <h2 className="text-xl font-semibold">Sonuçlarınız</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Hesabınız kaydedildi ve tüm katılımcıların verilerine göre tahmini sonuçlar hesaplandı.
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-sky-500/10 p-6 shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
                <p className="text-sm uppercase tracking-[0.18em] text-sky-500">Tahmini Puanınız</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{result.score.toFixed(2)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-sky-500/10 p-6 shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
                <p className="text-sm uppercase tracking-[0.18em] text-sky-500">Tahmini Sıralamanız</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{result.rank}</p>
              </div>
              <div className="rounded-[1.5rem] bg-sky-500/10 p-6 shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
                <p className="text-sm uppercase tracking-[0.18em] text-sky-500">Toplam Katılımcı</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{result.totalParticipants}</p>
              </div>
              <div className="rounded-[1.5rem] bg-sky-500/10 p-6 shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
                <p className="text-sm uppercase tracking-[0.18em] text-sky-500">AGS Ortalama Neti</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{result.avgAgs.toFixed(2)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-sky-500/10 p-6 shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
                <p className="text-sm uppercase tracking-[0.18em] text-sky-500">ÖABT Ortalama Neti</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{result.avgOabt.toFixed(2)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-sky-500/10 p-6 shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
                <p className="text-sm uppercase tracking-[0.18em] text-sky-500">Genel Ortalama Puan</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{result.avgScore.toFixed(2)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-sky-500/10 p-6 shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
                <p className="text-sm uppercase tracking-[0.18em] text-sky-500">En Yüksek Puan</p>
                <p className="mt-4 text-3xl font-semibold text-slate-950">{result.maxScore.toFixed(2)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-[0_10px_30px_rgba(14,165,233,0.16)] sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.18em] text-sky-300">Yüzdelik Diliminiz</p>
                <p className="mt-4 text-3xl font-semibold">{result.percentileLabel}</p>
              </div>
            </section>
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:col-span-2">
              <p className="text-sm leading-6 text-slate-100">
                📢 Bu sıralama sistemi girilen yeni verilerle sürekli güncellenmektedir. Güncel sıralamanızı, ortalama netleri ve son istatistikleri öğrenmek için Telegram kanalımıza katılabilirsiniz.
              </p>
              <a
                href="https://t.me/ozelegitim2027"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-3xl bg-sky-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-sky-400"
              >
                📲 Güncel Sıralamamı Telegram'dan Öğren
              </a>
              <p className="mt-4 text-xs leading-5 text-slate-400">
                Yeni veri girişleri oldukça sıralamalar değişebilir. En güncel sıralamanızı Telegram kanalımızdan takip edebilirsiniz.
              </p>
            </div>
          ) : null}
        </form>

        <div className="rounded-[1.75rem] bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-6 shadow-[0_24px_80px_rgba(14,165,233,0.2)] text-white transition sm:p-8">
          <div className="space-y-4 sm:flex sm:items-start sm:justify-between sm:gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                AGS 2027 Çalışma Grubu
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                AGS 2027 Çalışma Grubu
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-sky-100/90 sm:text-base">
                2027 AGS sürecine hazırlanan Özel Eğitim öğretmen adayları için çalışma grubu, güncel paylaşımlar, sınav analizleri ve atama sürecine dair bilgilendirmeler paylaşılmaktadır.
              </p>
              <p className="mt-4 rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-sky-500/20">
                AGS 2027 ÇALIŞMA GRUBUNA KATILMAK İÇİN TIKLAYIN
              </p>
            </div>
            <a
              href="https://t.me/ozelegitim2027"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-3xl bg-white text-slate-950 transition hover:bg-slate-100"
            >
              Çalışma Grubuna Katıl
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
