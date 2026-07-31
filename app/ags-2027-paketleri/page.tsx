import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGS 2027 Özel Eğitim ÖABT Hazırlık Paketi",
  description:
    "2027 Özel Eğitim ÖABT hazırlık sürecinde ihtiyacınız olan tüm içerikler tek pakette.",
};

const features = [
  { emoji: "📚", label: "Ders Notları" },
  { emoji: "📝", label: "Denemeler" },
  { emoji: "🎯", label: "Soru Çözümleri" },
  { emoji: "📄", label: "PDF Kaynaklar" },
  { emoji: "📊", label: "Deneme Analizleri" },
  { emoji: "🔥", label: "Düzenli Takip" },
];

export default function Ags2027PaketleriPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-slate-950 via-sky-950 to-blue-900 px-6 py-8 text-white shadow-[0_25px_90px_rgba(2,6,23,0.25)] sm:px-8 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                Profesyonel Online Eğitim Platformu
              </p>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                AGS 2027 Özel Eğitim ÖABT Hazırlık Paketi
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                Atandıran Özel Eğitim ÖABT&apos;yi fullemek hedefimiz.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur">
                  ✔ Düzenli deneme takibi
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur">
                  ✔ Soru çözüm desteği
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-sky-100 backdrop-blur">
                  ✔ Planlı hazırlık süreci
                </span>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-100">Neden bu paket?</h2>
                <p className="mt-3 text-base leading-7 text-slate-200">
                  Program kapsamında düzenli denemeler, soru analizleri ve konu tekrarları ile sınav sürecinizi daha planlı şekilde yürütmenize yardımcı oluyoruz.
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Sınırlı Paket Fırsatı
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Hızlı erişim
                </span>
              </div>

              <p className="mt-6 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">1200 TL</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                ÖABT hazırlığınızı tek paketle güvenli ve planlı şekilde tamamlayın.
              </p>

              <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-4">
                <p className="text-sm font-semibold text-sky-700">Hemen bilgi alın</p>
                <p className="mt-1 text-sm text-slate-600">
                  Telegram üzerinden paket içeriği, kayıt süreci ve detayları öğrenebilirsiniz.
                </p>
              </div>

              <a
                href="https://t.me/ozelegitimm"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-blue-700 px-5 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Telegram&apos;dan Bilgi Al
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 text-2xl shadow-sm transition duration-300 group-hover:scale-105">
                {feature.emoji}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.label} ile hazırlığınızı destekleyin ve sınav performansınızı güçlendirin.
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[1.75rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">Güvenilir Hazırlık Desteği</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            Program kapsamında düzenli denemeler, soru analizleri ve konu tekrarları ile sınav sürecinizi daha planlı şekilde yürütmenize yardımcı oluyoruz.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h3 className="font-semibold text-slate-900">Düzenli Deneme Takibi</h3>
              <p className="mt-2 text-sm text-slate-600">Her deneme sonrası performansınızı ölçerek gelişiminizi izliyoruz.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h3 className="font-semibold text-slate-900">Soru Çözüm Desteği</h3>
              <p className="mt-2 text-sm text-slate-600">Eksik olduğunuz noktaları soru çözüm yöntemleriyle güçlendiriyoruz.</p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[1.75rem] bg-slate-900 p-8 text-white shadow-xl ring-1 ring-white/10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Hemen Bilgi Al</p>
              <h2 className="mt-3 text-3xl font-semibold">Paketle ilgili sorularınız mı var?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                Telegram üzerinden yazmanız yeterlidir, paket içeriği ve kayıt süreci hakkında hemen bilgi alabilirsiniz.
              </p>
            </div>
            <a
              href="https://t.me/ozelegitimm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Telegram&apos;dan Bilgi Al
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
