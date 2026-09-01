"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { telUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/whatsapp/cta-buttons";
import { useScrollLock } from "@/components/motion/use-scroll-lock";

const links = [
  { href: "/rooms", label: "Stay" },
  { href: "/dining-events", label: "Dining & Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(open);

  const solid = scrolled || !overHero || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-ink/8 bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-black/45 to-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label={`${site.name} home`}
        >
          <span
            className={cn(
              "font-display text-xl tracking-tight md:text-2xl",
              solid ? "text-forest" : "text-white"
            )}
          >
            {site.name}
          </span>
          <span
            className={cn(
              "mt-0.5 text-[9px] uppercase tracking-[0.28em]",
              solid ? "text-brass" : "text-white/75"
            )}
          >
            Resort · Cafe · Banquet
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative px-1 py-2 text-sm font-medium transition-colors",
                  solid ? "text-ink/75 hover:text-forest" : "text-white/85 hover:text-white",
                  active && (solid ? "text-forest" : "text-white")
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telUrl()}
            className={cn(
              "hidden items-center gap-2 py-2 text-sm font-medium transition-colors md:flex",
              solid ? "text-forest hover:text-brass" : "text-white hover:text-brass-soft"
            )}
          >
            <Phone aria-hidden className="size-4" />
            {site.phone}
          </a>
          <WhatsAppButton size="sm" label="Enquire" className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "-mr-2 grid size-11 place-items-center rounded-full transition-colors lg:hidden",
              solid ? "text-forest hover:bg-forest/5" : "text-white hover:bg-white/10"
            )}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-ink/8 bg-cream lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/5 py-4 font-display text-2xl text-forest last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-5">
            <WhatsAppButton size="lg" label="WhatsApp Us" />
            <a
              href={telUrl()}
              className="text-center text-sm font-medium text-ink/70"
            >
              or call {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
