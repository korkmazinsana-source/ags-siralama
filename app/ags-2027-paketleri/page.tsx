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
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 px-6 py-14 text-white shadow-2xl sm:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
              AGS 2027 Özel Eğitim ÖABT Hazırlık Paketi
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              AGS 2027 Özel Eğitim ÖABT Hazırlık Paketi
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Atandıran Özel Eğitim ÖABT'yi fullemek hedefimiz.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-6 rounded-[1.75rem] bg-white/5 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.16)] ring-1 ring-white/10 backdrop-blur sm:p-8">
                <h2 className="text-xl font-semibold text-slate-100">Neden bu paket?</h2>
                <p className="mt-4 text-base leading-7 text-slate-200">
                  Program kapsamında düzenli denemeler, soru analizleri ve konu tekrarları ile sınav sürecinizi daha planlı şekilde yürütmenize yardımcı oluyoruz.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {features.map((item) => (
                    <div key={item.label} className="rounded-3xl bg-slate-950/80 p-4 text-slate-100 ring-1 ring-white/10">
                      <p className="text-sm font-semibold">{item.emoji} {item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-white p-8 shadow-xl ring-1 ring-slate-200">
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Sınırlı Paket Fırsatı</span>
                <p className="mt-4 text-5xl font-bold tracking-tight text-slate-950">1200 TL</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  ÖABT hazırlığınızı tek paketle güvenli ve planlı şekilde tamamlayın.
                </p>
                <a
                  href="https://t.me/ozelegitimm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  Telegram'dan Bilgi Al
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-2xl">{feature.emoji}</p>
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
              className="inline-flex h-14 items-center justify-center rounded-full bg-sky-500 px-6 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Telegram'dan Bilgi Al
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
