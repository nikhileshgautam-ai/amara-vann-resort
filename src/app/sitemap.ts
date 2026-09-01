import type { MetadataRoute } from "next";
import { rooms } from "@/content/rooms";
import { site } from "@/content/site";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

// A static export has no server to evaluate this per request, so it is
// generated once at build time. Change the env vars, rebuild, redeploy.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/rooms", priority: 0.9 },
    { path: "/dining-events", priority: 0.9 },
    { path: "/gallery", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ].map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const roomRoutes = rooms.map((room) => ({
    url: `${base}/rooms/${room.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...roomRoutes];
}
