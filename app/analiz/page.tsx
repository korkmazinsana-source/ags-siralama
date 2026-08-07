export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-4 py-10 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.3)] ring-1 ring-white/10 sm:p-10">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-100/80">Analiz Hizmeti</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              AGS – ÖABT Sıralama Analizi
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-100/90 sm:text-lg">
              Uzman ekibimiz ile elimizde bulunan 3.000’den fazla aday verisini analiz ederek AGS ve ÖABT netlerinize göre sıralama aralığınızı ve atama durumunuzu değerlendiriyoruz.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-4 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-900/30 sm:text-base">
              Analiz Ücreti: <span className="text-white">100 TL</span>
            </div>
            <a
              href="https://t.me/+Zr6OpUgjZakxNDRk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-3xl bg-white px-6 py-4 text-center text-lg font-semibold text-slate-950 shadow-xl transition hover:bg-slate-100 sm:w-auto"
            >
              📲 ANALİZ İÇİN TELEGRAM’A TIKLAYIN
            </a>
            <p className="max-w-2xl text-sm leading-6 text-slate-100/80">
              Telegram üzerinden ödeme işlemi tamamlandıktan sonra kişiye özel analiz raporunuz PDF formatında gönderilir.
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            "3.000+ Aday Verisi",
            "Uzman Ekip Analizi",
            "Kişiye Özel PDF Raporu",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 px-6 py-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.18)]"
            >
              <p className="text-base font-semibold text-slate-100">{item}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] bg-slate-950/90 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.25)] ring-1 ring-white/10">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Analizde Neler Var?
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Sıralama Aralığınız",
                description:
                  "Netleriniz, elimizdeki aday verileriyle karşılaştırılarak sıralama aralığınız analiz edilir.",
              },
              {
                title: "Atama Durumunuz",
                description:
                  "Kontenjan ve sıralama verileri birlikte değerlendirilerek atama durumunuz yorumlanır.",
              },
              {
                title: "AGS + ÖABT Analizi",
                description:
                  "AGS ve ÖABT performansınız genel aday kitlesiyle karşılaştırılır.",
              },
              {
                title: "Kişiye Özel PDF Raporu",
                description:
                  "Analiz sonuçlarınız size özel hazırlanmış PDF raporu olarak gönderilir.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-200">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 p-8 text-slate-950 shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Analizinizi Başlatın
              </h2>
              <p className="max-w-xl text-base leading-7 text-slate-100/90">
                AGS ve ÖABT netlerinizi Telegram üzerinden gönderin. Ödeme sonrasında analiziniz hazırlanarak PDF formatında tarafınıza iletilir.
              </p>
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <a
                href="https://t.me/+Zr6OpUgjZakxNDRk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-3xl bg-white px-6 py-4 text-center text-lg font-semibold text-slate-950 shadow-xl transition hover:bg-slate-100 sm:w-auto"
              >
                📲 TELEGRAM’DAN BAŞVUR – 100 TL
              </a>
              <p className="max-w-xl text-sm leading-6 text-slate-100/80">
                Analizler mevcut veriler üzerinden yapılan değerlendirmelerdir. Resmî sonuç veya atama garantisi değildir.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
