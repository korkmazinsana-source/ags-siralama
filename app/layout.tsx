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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
