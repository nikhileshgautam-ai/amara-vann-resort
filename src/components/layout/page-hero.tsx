import { SmartImage } from "@/components/media/smart-image";
import { SplitWords, FadeIn } from "@/components/motion/split-words";

export function PageHero({
  eyebrow,
  title,
  lead,
  seed = 0,
  image,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  seed?: number;
  image?: string;
}) {
  return (
    <section className="h-page-hero relative flex items-end overflow-hidden">
      <SmartImage
        src={image}
        alt={title}
        label={`${title} — header photograph`}
        seed={seed}
        plain
        priority
        className="kenburns"
        sizes="100vw"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/88 to-ink/30" />
      <div aria-hidden className="grain absolute inset-0" />
      <div className="container-page relative w-full pb-14 pt-32 md:pb-20">
        <div className="max-w-2xl">
          {eyebrow ? (
            <FadeIn waitForIntro>
              <p className="eyebrow text-brass-soft">{eyebrow}</p>
            </FadeIn>
          ) : null}
          <h1 className="balance mt-4 font-display text-[clamp(2.3rem,5.4vw,4.1rem)] leading-[1.02] tracking-[-0.015em] text-white">
            <SplitWords text={title} delay={0.1} waitForIntro />
          </h1>
          {lead ? (
            <FadeIn delay={0.45} waitForIntro>
              <p className="mt-5 max-w-xl leading-relaxed text-white/80">{lead}</p>
            </FadeIn>
          ) : null}
        </div>
      </div>
    </section>
  );
}
