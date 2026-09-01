"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/cta-buttons";
import { ParallaxBackdrop } from "@/components/motion/parallax-backdrop";
import { SplitWords, FadeIn } from "@/components/motion/split-words";
import { CountUp } from "@/components/motion/count-up";
import { Magnetic } from "@/components/motion/magnetic";
import { useIntroOffset } from "@/components/motion/use-intro-offset";
import { waMessages } from "@/lib/whatsapp";

export function Hero() {
  // Above-the-fold motion waits out the intro curtain on a first visit, and
  // starts immediately on every load after that.
  const offset = useIntroOffset();

  return (
    <section className="h-hero relative flex items-end overflow-hidden">
      <ParallaxBackdrop>
        <SmartImage
          src={undefined}
          alt={`${site.legalName} seen from the garden`}
          label="Hero photograph — property exterior"
          seed={2}
          plain
          priority
          sizes="100vw"
          className="kenburns"
        />
      </ParallaxBackdrop>

      {/* Two overlays: a vertical lift for legibility, and a soft corner
          vignette so the headline never sits on a flat field of colour. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/25"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(90% 70% at 15% 85%, rgba(11,23,18,0.55), transparent 60%)",
        }}
      />
      <div aria-hidden className="grain absolute inset-0" />

      <div className="container-page relative w-full pb-16 pt-32 md:pb-24">
        <div className="max-w-3xl">
          <FadeIn delay={offset}>
            <p className="eyebrow text-brass-soft">{site.tagline}</p>
          </FadeIn>

          <h1 className="balance mt-5 font-display text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.98] tracking-[-0.02em] text-white">
            <SplitWords text={site.heroHeading} delay={offset + 0.12} />
          </h1>

          <FadeIn delay={offset + 0.55}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              {site.heroSubheading}
            </p>
          </FadeIn>

          <FadeIn delay={offset + 0.7}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Magnetic className="flex w-full sm:w-auto">
                <WhatsAppButton
                  size="lg"
                  label="Enquire on WhatsApp"
                  message={waMessages.stay}
                  className="w-full sm:w-auto"
                />
              </Magnetic>
              <Magnetic className="flex w-full sm:w-auto">
                <Button asChild size="lg" variant="light" className="w-full sm:w-auto">
                  <Link href="/rooms">Explore Rooms</Link>
                </Button>
              </Magnetic>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={offset + 0.9} className="mt-14 border-t border-white/15 pt-8">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl text-white md:text-4xl">
                  <CountUp value={stat.value} />
                </dd>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/55">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>

      <ChevronDown
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden size-5 -translate-x-1/2 animate-bounce text-white/50 lg:block"
      />
    </section>
  );
}
