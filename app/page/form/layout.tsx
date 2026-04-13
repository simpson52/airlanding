import type { Metadata } from "next";

/**
 * 레거시 `/page/form` 경로. 네비에서 사용하지 않으며 `/form`과 중복이므로 색인 제외.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegacyFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
