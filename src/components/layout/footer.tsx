import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/layout/social-icons";
import { site, fullAddress } from "@/content/site";
import { telUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/whatsapp/cta-buttons";

const explore = [
  { href: "/rooms", label: "Rooms & Cottages" },
  { href: "/dining-events", label: "Cafe & Banquet" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact & Location" },
];

export function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-[calc(6rem+env(safe-area-inset-bottom))] text-mist md:pb-16">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-3xl text-cream">{site.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-brass-soft">
              Resort · Cafe · Banquet
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist/70">
              {site.shortDescription}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-mist/20 transition-colors hover:border-brass hover:text-brass"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full border border-mist/20 transition-colors hover:border-brass hover:text-brass"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="eyebrow text-brass-soft">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-2 text-mist/75 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-brass-soft">Reach Us</h2>
            <ul className="mt-5 space-y-4 text-sm text-mist/75">
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
                <address className="not-italic leading-relaxed">{fullAddress}</address>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
                <a
                  href={telUrl()}
                  className="inline-block py-2 transition-colors hover:text-cream"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block py-2 transition-colors hover:text-cream"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-brass-soft">Hours</h2>
            <ul className="mt-5 space-y-3 text-sm text-mist/75">
              {site.hours.map((row) => (
                <li key={row.label} className="flex justify-between gap-4 min-w-0">
                  <span>{row.label}</span>
                  <span className="text-right text-mist/90">{row.value}</span>
                </li>
              ))}
            </ul>
            <WhatsAppButton size="sm" label="Enquire on WhatsApp" className="mt-6 w-full" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-mist/10 pt-8 text-xs text-mist/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>{site.landmark}</p>
        </div>
      </div>
    </footer>
  );
}
