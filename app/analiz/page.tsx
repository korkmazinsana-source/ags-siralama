export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-100 to-white px-4 py-10 text-slate-900">
      <main className="mx-auto w-full max-w-5xl space-y-8 rounded-[2rem] bg-white/95 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10">
        <section className="rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-[0_18px_60px_rgba(15,23,42,0.16)]">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Sıralama Analizi</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
            100 TL Sıralama Analizi
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
            Mevcut sıralama ve atama sisteminizi değiştirmeden, size özel analiz raporu ile tercih dönemine daha güçlü hazırlanın.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-sky-600/20 px-5 py-4 text-sm font-semibold text-slate-100">
            Analiz Ücreti: <span className="text-white">100 TL</span>
          </div>
        </section>

        <section className="grid gap-6 rounded-[1.75rem] bg-slate-50 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:grid-cols-2">
          <div className="space-y-3 rounded-[1.5rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Sıralama Analizi</h2>
            <p className="text-sm leading-6 text-slate-600">
              Mevcut verilerinize göre sıralama kriterleri ve olası yerleşme durumları hakkında kapsamlı bir değerlendirme sunulur.
            </p>
          </div>
          <div className="space-y-3 rounded-[1.5rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Atama Durumu Değerlendirmesi</h2>
            <p className="text-sm leading-6 text-slate-600">
              Atama olasılığınızı etkileyen AGS, ÖABT ve kontenjan parametreleri göz önünde bulundurularak özel bir analiz yapılır.
            </p>
          </div>
          <div className="space-y-3 rounded-[1.5rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Kontenjan Bazlı Yorumlama</h2>
            <p className="text-sm leading-6 text-slate-600">
              Kontenjan verilerine göre hangi bölge ve kadrolarda öne çıkabileceğinizi açıklayan özel bir yorumlama raporu hazırlanır.
            </p>
          </div>
          <div className="space-y-3 rounded-[1.5rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Kişiye Özel PDF Analiz Raporu</h2>
            <p className="text-sm leading-6 text-slate-600">
              Size özel hazırlanan analiz raporu PDF formatında sunulur; kolayca indirebilir ve kayıtlı bilgilerinizle kıyaslayabilirsiniz.
            </p>
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-[0_18px_60px_rgba(15,23,42,0.16)]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Analiz İçeriği</h2>
            <p className="text-sm leading-6 text-slate-300">
              Bu analiz sayfası mevcut site yapısını bozmadan ek bir hizmet sunar. Mevcut hesaplama sistemi aynen çalışmaya devam ederken, size özel bir değerlendirme raporu alabilirsiniz.
            </p>
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              <li>• AGS ve ÖABT performans değerlendirmesi</li>
              <li>• Tahmini sıralama aralığı ve yerleşme olasılığı</li>
              <li>• Kontenjan verilerine göre tercih önerileri</li>
              <li>• PDF formatında kişiye özel rapor</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 rounded-[1.75rem] bg-slate-50 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Başvurunuzu Telegram üzerinden yapın</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Kampanya ve analiz hizmeti için Telegram üzerinden bize hızlıca ulaşabilirsiniz.
            </p>
          </div>
          <a
            href="https://t.me/+Zr6OpUgjZakxNDRk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full bg-sky-600 px-6 text-base font-semibold text-white transition hover:bg-sky-500"
          >
            📲 Telegram'dan Başvur
          </a>
        </section>
      </main>
    </div>
  );
}
