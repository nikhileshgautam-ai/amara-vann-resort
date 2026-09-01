import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isIndexable } from "@/lib/seo";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

// A static export has no server to evaluate this per request, so it is
// generated once at build time. Change the env vars, rebuild, redeploy.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Until launch, keep everything out. See src/lib/seo.ts for why.
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
