import type { Metadata } from "next";

const DESCRIPTION =
  "AIR·MISO 문의. 이메일·오시는 길 안내 및 서비스 관련 연락처를 확인할 수 있습니다.";

export const metadata: Metadata = {
  title: "문의하기",
  description: DESCRIPTION,
  alternates: {
    canonical: "/page/contact",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/page/contact",
    title: "문의하기 | AIR",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "문의하기 | AIR",
    description: DESCRIPTION,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
