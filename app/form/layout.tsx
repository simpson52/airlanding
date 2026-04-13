import type { Metadata } from "next";

const DESCRIPTION =
  "AIR 서비스 사용 신청. 사업자등록번호·회사 정보 입력 후 신청서를 제출할 수 있습니다.";

export const metadata: Metadata = {
  title: "서비스 이용 신청",
  description: DESCRIPTION,
  alternates: {
    canonical: "/form",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/form",
    title: "서비스 이용 신청 | AIR",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "서비스 이용 신청 | AIR",
    description: DESCRIPTION,
  },
};

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
