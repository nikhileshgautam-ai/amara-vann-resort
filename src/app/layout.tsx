import type { Metadata, Viewport } from "next";
// Fonts are self-hosted (shipped in node_modules, bundled at build time) so the
// site makes no third-party requests and the CSP can stay strict.
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { FloatingWhatsApp } from "@/components/whatsapp/floating-whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { PageTransition } from "@/components/motion/page-transition";
import { RouteProgress } from "@/components/motion/route-progress";
import { IntroCurtain } from "@/components/motion/intro-curtain";
import { site, fullAddress } from "@/content/site";
import { isIndexable } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
  title: {
    default: `${site.legalName} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.shortDescription} ${fullAddress}. Call ${site.phone} or message us on WhatsApp.`,
  keywords: [
    "resort near me",
    `resort in ${site.address.city}`,
    `banquet hall in ${site.address.city}`,
    `cafe in ${site.address.city}`,
    "wedding venue",
    "weekend getaway",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.legalName,
    title: `${site.legalName} | ${site.tagline}`,
    description: site.shortDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} | ${site.tagline}`,
    description: site.shortDescription,
  },
  // Belt and braces alongside robots.txt: a noindex meta tag is obeyed even
  // when a crawler reaches a page without reading robots.txt first.
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#16362b",
  width: "device-width",
  initialScale: 1,
  // Required for env(safe-area-inset-*) to report anything but 0 on notched
  // phones. Without it the bottom action bar sits under the home indicator.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      {/*
        Browser extensions (Grammarly, password managers, dark-mode add-ons)
        inject attributes onto <html>/<body> before React hydrates, which React
        reports as a hydration mismatch. suppressHydrationWarning applies to
        these two elements only - it does not hide real mismatches inside the app.
      */}
      <body className="no-js antialiased" suppressHydrationWarning>
        {/* Runs before hydration so the curtain is only ever shown to
            visitors who can actually see it lift. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.body.classList.remove('no-js')",
          }}
        />
        <IntroCurtain />
        <RouteProgress />
        <Navbar />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <MobileActionBar />
        <FloatingWhatsApp />
        <JsonLd />
      </body>
    </html>
  );
}
