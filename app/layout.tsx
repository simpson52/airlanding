import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIR - AI기반 위험성 평가 솔루션 Made by MISO",
  description:
    "JSA + KRAS + SIF를 결합한 국내 유일의 현장 데이터 기반 지능형 안전관리 시스템",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
