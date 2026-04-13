import type { Metadata } from "next";

/** 레거시 경로; `/form/thank-you`만 사용 권장 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegacyFormThankYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
