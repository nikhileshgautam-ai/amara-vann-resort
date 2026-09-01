import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/layout/section";
import { SmartImage } from "@/components/media/smart-image";
import { FacilityGrid } from "@/components/home/facility-grid";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { CtaBand } from "@/components/home/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.legalName} — a family-run resort, garden cafe and banquet lawn in ${site.address.city}. ${site.shortDescription}`,
  alternates: { canonical: "/about" },
  openGraph: { title: `About | ${site.name}`, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Twenty-two acres, one family, three decades"
        lead="What started as a weekend farmhouse is now a resort, a cafe and a banquet lawn — run by the same people who planted the trees."
        seed={2}
      />

      <Section tone="cream" className="texture-paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="Built slowly, on purpose" />
            <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-ink/75">
              <p>
                The land was bought in the early nineties as farmland. The first four rooms
                came a decade later, mostly because friends kept asking to stay the weekend.
              </p>
              <p>
                The cafe opened next, and turned out to be the thing the town adopted — people
                drive up for the filter coffee who have never seen a room. The lawn followed,
                and with it the weddings.
              </p>
              <p>
                We have added rooms since, but slowly, and never at the cost of the trees.
                Twenty-four keys is where we intend to stop.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <SmartImage alt="The original farmhouse" label="The original farmhouse" seed={0} sizes="(max-width:768px) 50vw, 25vw" />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-2xl">
              <SmartImage alt="Trees on the property" label="The mango grove" seed={3} sizes="(max-width:768px) 50vw, 25vw" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="forest">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading invert eyebrow="How we work" title="Four things we do not compromise on" />
          <div className="grid gap-8 sm:grid-cols-2">
            {site.whyUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07}>
                <h3 className="font-display text-2xl text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/70">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="Facilities" title="On the property" align="center" />
        <div className="mt-12">
          <FacilityGrid />
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Guest reviews" title="In their words" align="center" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={(index % 3) * 0.07}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
