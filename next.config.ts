import type { NextConfig } from "next";

/**
 * Cloudflare Pages sets CF_PAGES in its build environment, so the static
 * export switches on by itself there and no separate build command is needed.
 * BUILD_TARGET=static reproduces the same build locally.
 */
const isStaticExport =
  Boolean(process.env.CF_PAGES) || process.env.BUILD_TARGET === "static";

/**
 * A GitHub Pages project site is served from /<repo>, not the domain root, so
 * routes and assets need that prefix or every stylesheet 404s. The deploy
 * workflow reads it from actions/configure-pages, which returns an empty string
 * once a custom domain is attached. Cloudflare Pages serves from the root and
 * never sets it.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Security headers for a public marketing site. No third-party scripts are
 * loaded, so the CSP can stay tight; the only external frame is the Google
 * Maps embed on the contact page.
 *
 * A static export has no server to send these, so the same list is duplicated
 * in public/_headers for Cloudflare. Change one, change the other.
 */
const csp = [
  "default-src 'self'",
  // Next.js injects small inline bootstrap scripts; 'unsafe-inline' is required
  // for those in the absence of a nonce middleware.
  "script-src 'self' 'unsafe-inline'" +
    (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  ...(isStaticExport
    ? {
        output: "export" as const,
        ...(basePath ? { basePath } : {}),
        // There is no server to run the image optimizer, so images are served
        // exactly as committed. See the note in README about sizing photos
        // before they go in the repo.
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] as const },
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
