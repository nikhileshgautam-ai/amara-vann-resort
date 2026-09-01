import { SmartImage } from "@/components/media/smart-image";
import { ScrollMedia } from "@/components/motion/scroll-media";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/layout/section";
import { experiences } from "@/content/experiences";
import { cn } from "@/lib/utils";

/**
 * Alternating editorial rows. This is the section that separates a hospitality
 * site from a template — it sells the stay rather than listing the amenities.
 */
export function ExperiencesSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Signature experiences"
          title="The parts people tell their friends about"
          lead="None of these cost extra. They are simply how a day here tends to go."
          align="center"
        />

        <div className="mt-16 space-y-16 md:space-y-24">
          {experiences.map((experience, index) => {
            const flipped = index % 2 === 1;
            return (
              <Reveal key={experience.id}>
                <article
                  className={cn(
                    "grid items-center gap-8 md:grid-cols-2 md:gap-14",
                    flipped && "md:[&>*:first-child]:order-2"
                  )}
                >
                  <ScrollMedia className="aspect-[5/4] rounded-2xl md:aspect-[4/3]">
                    <SmartImage
                      alt={experience.title}
                      label={experience.title}
                      seed={experience.seed}
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </ScrollMedia>

                  <div className={cn(flipped ? "md:pr-6" : "md:pl-6")}>
                    <span
                      aria-hidden
                      className="font-display text-6xl leading-none text-brass/25 md:text-7xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-forest md:text-4xl">
                      {experience.title}
                    </h3>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-brass">
                      {experience.time}
                    </p>
                    <p className="pretty mt-5 leading-relaxed text-ink/70">
                      {experience.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
