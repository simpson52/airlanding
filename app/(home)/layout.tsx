import type { Metadata } from "next";

const DESCRIPTION =
  "JSA + KRAS + SIF를 결합한 국내 유일의 현장 데이터 기반 지능형 안전관리 시스템";

/** seo.md 2-4~2-6: 홈(/) 전용 메타·canonical·OG (루트 title template 미적용) */
export const metadata: Metadata = {
  title: {
    absolute: "AIR - AI기반 위험성 평가 솔루션 Made by MISO",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "AIR - AI기반 위험성 평가 솔루션 Made by MISO",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "AIR - AI기반 위험성 평가 솔루션 Made by MISO",
    description: DESCRIPTION,
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
