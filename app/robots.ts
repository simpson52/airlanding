import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";

/** seo.md 2-2 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
