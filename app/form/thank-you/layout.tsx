import type { Metadata } from "next";

const DESCRIPTION = "AIR 서비스 이용 신청이 접수되었습니다.";

export const metadata: Metadata = {
  title: "신청 완료",
  description: DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "신청 완료 | AIR",
    description: DESCRIPTION,
    url: "/form/thank-you",
  },
  twitter: {
    card: "summary",
    title: "신청 완료 | AIR",
    description: DESCRIPTION,
  },
};

export default function FormThankYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
