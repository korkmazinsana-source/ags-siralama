import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGS 2027 Özel Eğitim ÖABT Hazırlık Paketi",
  description:
    "2027 Özel Eğitim ÖABT hazırlık sürecinde ihtiyacınız olan tüm içerikler tek pakette.",
};

export default function Ags2027PaketleriPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 px-6 py-14 text-white shadow-2xl sm:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
              🚀 AGS 2027 Özel Eğitim ÖABT Hazırlık Paketi
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Atandıran Özel Eğitim ÖABT'yi fullemek hedefimiz!
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              2027 Özel Eğitim ÖABT hazırlık sürecinde ihtiyacınız olan tüm içerikler tek pakette.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(180px,280px)]">
              <div className="space-y-4 rounded-3xl bg-white/5 p-6 shadow-[0_25px_50px_-40px_rgba(15,23,42,0.8)] ring-1 ring-white/10 backdrop-blur">
                <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-100 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Paket içerisinde</p>
                  <ul className="mt-6 space-y-3 text-base leading-7 text-slate-200">
                    <li>✅ ÖABT Denemeleri</li>
                    <li>✅ Konu bazlı soru çözümleri</li>
                    <li>✅ Güncel ders notları</li>
                    <li>✅ PDF kaynaklar</li>
                    <li>✅ Özet tekrar dokümanları</li>
                    <li>✅ Sınav analizleri</li>
                    <li>✅ Eksik konuları belirlemeye yönelik çalışmalar</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 text-slate-950 shadow-xl ring-1 ring-slate-200/60">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                  Tek fiyat
                </div>
                <div className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
                  1200 TL
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  ÖABT hazırlığınızı eksiksiz ve güçlü bir paketle destekleyin.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="https://t.me/ozelegitimm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Telegram'dan İletişime Geç
              </a>
              <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 ring-1 ring-white/10">
                Satın almak için iletişim. Telegram üzerinden yazmanız yeterlidir.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <div className="rounded-[1.75rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900">Program Açıklaması</h2>
              <p className="mt-4 text-base leading-8 text-slate-700">
                Program kapsamında düzenli denemeler yaparak seviyenizi takip ediyoruz. Soru çözümleri ile eksik olduğunuz noktaları belirliyor, ders notları ve PDF içerikleriyle tekrar sürecinizi destekliyoruz. Hedefimiz Özel Eğitim ÖABT'de yüksek başarı elde ederek atama sürecinde güçlü bir hazırlık sağlamaktır.
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-white p-8 shadow-lg ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Neden Bu Paket?</h2>
                  <p className="mt-3 text-sm text-slate-600">
                    ÖABT hazırlığında ilerlemenizi hızlandıracak, düzenli takip ve kaliteli kaynaklarla hazırlanmış bir paket.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "📌 Düzenli Deneme Takibi",
                  "📌 Soru Çözüm Desteği",
                  "📌 Güncel Ders Notları",
                  "📌 PDF Kaynak Arşivi",
                  "📌 Sınav Analizleri",
                ].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 shadow-sm">
                    <p className="text-base font-semibold text-slate-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] bg-slate-900 p-8 text-white shadow-xl ring-1 ring-white/10">
              <h3 className="text-xl font-semibold">Satın almak için iletişim</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Telegram üzerinden yazmanız yeterlidir.
              </p>
              <a
                href="https://t.me/ozelegitimm"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Telegram'dan İletişime Geç
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Paket Detayları</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>• Deneme sınavları ile günü yakala.</li>
                <li>• Konu konu eksiklerin tespit edilsin.</li>
                <li>• Sınav analizleri ile başarı yol haritası çıkar.</li>
                <li>• PDF ve özet dokümanlarla tekrar kolaylaşsın.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
