import type { Metadata } from "next";

const DESCRIPTION =
  "MISO 소개 및 AIR 사례. GS가 만든 AI 기반 위험성 평가·안전관리 솔루션을 확인합니다.";

export const metadata: Metadata = {
  title: "MISO 소개",
  description: DESCRIPTION,
  alternates: {
    canonical: "/page/miso",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/page/miso",
    title: "MISO 소개 | AIR",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "MISO 소개 | AIR",
    description: DESCRIPTION,
  },
};

export default function MisoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
