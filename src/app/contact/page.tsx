import type { Metadata } from "next";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/layout/section";
import { LocationSection } from "@/components/location/location-section";
import { CtaBand } from "@/components/home/cta-band";
import { FaqSection } from "@/components/faq/faq-section";
import { site, fullAddress } from "@/content/site";
import { whatsappUrl, telUrl, waMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `Call ${site.phone}, message us on WhatsApp, or visit us at ${fullAddress}. Reception is open 24 hours.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact | ${site.name}`, url: "/contact" },
};

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Fastest — usually answered within the hour",
    action: "Start a chat",
    href: whatsappUrl(waMessages.general),
    external: true,
    accent: true,
  },
  {
    icon: Phone,
    title: "Phone",
    detail: `${site.phone} · ${site.phoneAlt}`,
    action: "Call reception",
    href: telUrl(),
    external: false,
    accent: false,
  },
  {
    icon: Mail,
    title: "Email",
    detail: `${site.email} — best for event proposals`,
    action: "Send an email",
    href: `mailto:${site.email}`,
    external: false,
    accent: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us directly"
        lead="No forms, no queue, no waiting for a callback. Message or call and you will get a person."
        seed={1}
      />

      <Section tone="cream">
        <SectionHeading title="Three ways to reach us" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className={`group flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                channel.accent
                  ? "border-[#25D366]/40 bg-[#25D366]/10 hover:border-[#25D366]"
                  : "border-ink/10 bg-white hover:border-forest/30"
              }`}
            >
              <channel.icon
                aria-hidden
                className={`size-6 ${channel.accent ? "text-[#128C7E]" : "text-brass"}`}
              />
              <h3 className="mt-5 font-display text-2xl text-forest">{channel.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{channel.detail}</p>
              <span className="mt-6 text-sm font-medium text-forest underline-offset-4 group-hover:underline">
                {channel.action} →
              </span>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Find us" title="Location & hours" />
        <div className="mt-12">
          <LocationSection />
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="FAQ"
          title="Everything people ask before booking"
          align="center"
        />
        <div className="mt-12">
          <FaqSection />
        </div>
      </Section>

      <CtaBand
        title="Still deciding?"
        lead="Send us a message with what you have in mind. We will tell you honestly whether we are the right fit."
      />
    </>
  );
}
