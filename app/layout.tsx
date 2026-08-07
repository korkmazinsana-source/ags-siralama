import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2026 Özel Eğitim AGS Tahmini Sıralama",
  description: "AGS ve ÖABT netlerinize göre Türkiye geneli tahmini sıralamanızı hesaplayın.",
  metadataBase: new URL("https://ags-siralama.vercel.app"),
  openGraph: {
    title: "2026 Özel Eğitim AGS Tahmini Sıralama",
    description: "AGS ve ÖABT netlerinize göre tahmini sıralamanızı ücretsiz hesaplayın.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 Özel Eğitim AGS Tahmini Sıralama",
    description: "AGS ve ÖABT netlerinize göre tahmini sıralamanızı ücretsiz hesaplayın.",
  },
  icons: {
    icon: "/icon.png",
  },
};

const MAINTENANCE_MODE = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 text-slate-100">
        {MAINTENANCE_MODE ? (
          <div className="flex min-h-screen items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <div className="space-y-6 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Bakım Modu</p>
                <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  🚧 Site Geçici Olarak Bakıma Alınmıştır
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  Sitemiz şu anda güncellenmektedir.
                </p>
                <p className="mx-auto max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  Lütfen daha sonra tekrar ziyaret ediniz.
                </p>
                <p className="text-sm text-slate-300">Anlayışınız için teşekkür ederiz.</p>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
