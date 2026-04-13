import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";

/** seo.md 2-3: 공개 페이지만 (thank-you·중복 폼 경로 제외) */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  const lastModified = new Date();

  const paths = ["", "/form", "/page/contact", "/page/miso"] as const;

  return paths.map((path) => ({
    url: `${base}${path === "" ? "" : path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.85,
  }));
}
