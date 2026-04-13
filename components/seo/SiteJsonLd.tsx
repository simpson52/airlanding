import { getSiteOrigin } from "@/lib/site";

const DEFAULT_DESCRIPTION =
  "JSA + KRAS + SIF를 결합한 국내 유일의 현장 데이터 기반 지능형 안전관리 시스템";

/**
 * 루트에만 삽입. Rich Results / 일반 검색용 WebSite·Organization·SoftwareApplication.
 */
export default function SiteJsonLd() {
  const base = getSiteOrigin();

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      name: "AIR",
      url: base,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "ko-KR",
      publisher: { "@id": `${base}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "MISO",
      url: base,
    },
    {
      "@type": "SoftwareApplication",
      name: "AIR",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DEFAULT_DESCRIPTION,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- 고정 스키마 JSON-LD만 주입
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
