import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Section, SectionHeading } from "@/components/layout/section";
import { FacilityGrid } from "@/components/home/facility-grid";
import { CtaBand } from "@/components/home/cta-band";
import { RoomCard } from "@/components/rooms/room-card";
import { TestimonialCarousel } from "@/components/testimonials/testimonial-carousel";
import { LocationSection } from "@/components/location/location-section";
import { ExperiencesSection } from "@/components/home/experiences-section";
import { FaqSection } from "@/components/faq/faq-section";
import { SmartImage } from "@/components/media/smart-image";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { rooms } from "@/content/rooms";
import { cafeIntro } from "@/content/menu";
import { banquetIntro } from "@/content/events";
import { galleryItems } from "@/content/gallery";
import { site } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

/** Span table for the homepage collage. Dense flow tiles these into 12 columns. */
const collageSpans = [
  "md:col-span-5 md:row-span-4",
  "md:col-span-4 md:row-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-4 md:row-span-2",
  "md:col-span-3 md:row-span-2",
  "md:col-span-7 md:row-span-3",
  "md:col-span-5 md:row-span-3",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Introduction */}
      <Section tone="cream" className="texture-paper">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Welcome"
              title={`Green, quiet, and close enough to drive to after work`}
              lead={`${site.name} began as a family farmhouse and grew into a small resort with a cafe people drive up for and a lawn that has hosted more than two hundred weddings. It is still run by the same family.`}
            />
            <ul className="mt-8 space-y-3">
              {[
                "24 rooms, cottages and villas across four categories",
                "An all-day garden cafe open to visitors, not just guests",
                "Lawn and hall for events from 20 to 500 guests",
                "45 minutes from the airport, 20 from the old city",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-ink/70">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <Link href="/about">Our Story</Link>
              </Button>
              <WhatsAppButton variant="outline" label="Ask us anything" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <SmartImage alt="The garden path at the resort" label="Garden path" seed={5} sizes="(max-width:768px) 50vw, 25vw" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl">
              <SmartImage alt="Cafe seating under the trees" label="Cafe seating" seed={1} sizes="(max-width:768px) 50vw, 25vw" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Rooms */}
      <Section tone="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Stay"
            title="Rooms, cottages and villas"
            lead="Four categories, all with complimentary breakfast and a view of something green."
          />
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/rooms">
              All rooms
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.slice(0, 3).map((room, index) => (
            <Reveal key={room.slug} delay={index * 0.08}>
              <RoomCard room={room} index={index} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/rooms">See all four categories</Link>
          </Button>
        </div>
      </Section>

      {/* Cafe + Banquet split */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Dining & Celebrations"
          title="A cafe you can walk into, a lawn you can book"
          lead="Two things the property is known for locally, both open to people who are not staying with us."
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[
            {
              tag: "The Cafe",
              title: cafeIntro.heading,
              blurb: cafeIntro.blurb,
              points: cafeIntro.highlights.slice(0, 3),
              cta: "Reserve a table",
              message: waMessages.table,
              seed: 4,
              alt: "Wood-fired oven at the garden cafe",
            },
            {
              tag: "Banquet & Lawn",
              title: banquetIntro.heading,
              blurb: banquetIntro.blurb,
              points: banquetIntro.spaces.map((space) => `${space.name} — ${space.capacity}`),
              cta: "Plan your event",
              message: waMessages.banquet,
              seed: 0,
              alt: "The banquet lawn set for a reception",
            },
          ].map((panel, index) => (
            <Reveal key={panel.tag} delay={index * 0.1}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage alt={panel.alt} label={panel.title} seed={panel.seed} sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="eyebrow text-brass">{panel.tag}</p>
                  <h3 className="mt-3 font-display text-3xl text-forest">{panel.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/65">{panel.blurb}</p>
                  <ul className="mt-6 space-y-2 text-sm text-ink/70">
                    {panel.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3 pt-2">
                    <WhatsAppButton label={panel.cta} message={panel.message} />
                    <Button asChild variant="outline">
                      <Link href="/dining-events">Learn more</Link>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <ExperiencesSection />

      {/* Facilities */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Facilities"
          title="What is on the property"
          align="center"
        />
        <div className="mt-12">
          <FacilityGrid />
        </div>
      </Section>

      {/* Gallery preview */}
      <Section tone="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Gallery" title="A look around" />
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/gallery">
              Full gallery
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <ul className="mt-12 grid auto-rows-[78px] grid-cols-6 grid-flow-dense gap-3 md:auto-rows-[112px] md:grid-cols-12 md:gap-4">
          {galleryItems.slice(0, 7).map((item, index) => (
            <li
              key={item.id}
              className={`relative col-span-3 row-span-2 overflow-hidden rounded-xl ${collageSpans[index]}`}
            >
              <SmartImage
                alt={item.caption}
                label={item.caption}
                seed={index}
                sizes="(max-width:768px) 50vw, 40vw"
                className="transition-transform duration-700 hover:scale-105"
              />
            </li>
          ))}
        </ul>
        <div className="mt-10 md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/gallery">Open the full gallery</Link>
          </Button>
        </div>
      </Section>

      {/* Why us */}
      <Section tone="forest">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            invert
            eyebrow="Why guests choose us"
            title="Small enough to care, large enough to host"
          />
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

      {/* Testimonials */}
      <Section tone="cream">
        <SectionHeading eyebrow="Guest reviews" title="What people say afterwards" />
        <div className="mt-14">
          <TestimonialCarousel />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Before you ask"
          title="Questions we get every week"
          align="center"
        />
        <div className="mt-12">
          <FaqSection limit={5} />
        </div>
      </Section>

      {/* Location */}
      <Section tone="white">
        <SectionHeading eyebrow="Find us" title="Getting here" />
        <div className="mt-12">
          <LocationSection />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
