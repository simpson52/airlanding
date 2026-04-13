/**
 * 절대 URL(사이트 루트) — metadataBase, sitemap, robots, canonical, JSON-LD에 사용.
 * 프로덕션에서는 `NEXT_PUBLIC_SITE_URL`을 권장 (예: https://air-miso.vercel.app).
 */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/\/+$/, "")}`;
  }
  return "http://localhost:3000";
}
