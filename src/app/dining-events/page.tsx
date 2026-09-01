import type { Metadata } from "next";
import { Users, Clock, Utensils } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/layout/section";
import { SmartImage } from "@/components/media/smart-image";
import { CtaBand } from "@/components/home/cta-band";
import { WhatsAppButton } from "@/components/whatsapp/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { cafeIntro, menu } from "@/content/menu";
import { banquetIntro, eventTypes } from "@/content/events";
import { site } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cafe, Banquet Hall & Events",
  description: `The garden cafe at ${site.legalName} is open 7:30 am to 11:00 pm. The lawn and banquet hall host weddings, receptions and corporate offsites for 20 to 500 guests in ${site.address.city}.`,
  alternates: { canonical: "/dining-events" },
  openGraph: { title: `Cafe & Banquet | ${site.name}`, url: "/dining-events" },
};

export default function DiningEventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Dining & Celebrations"
        title="The cafe and the banquet lawn"
        lead="One kitchen, two very different rooms — an all-day cafe under the trees, and a lawn built for the days that matter."
        seed={4}
      />

      {/* CAFE */}
      <Section tone="cream" id="cafe">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="The Cafe" title={cafeIntro.heading} lead={cafeIntro.blurb} />
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div className="flex items-center gap-2 text-ink/70">
                <Clock aria-hidden className="size-4 text-brass" />
                <dt className="sr-only">Hours</dt>
                <dd>{cafeIntro.hours}</dd>
              </div>
              <div className="flex items-center gap-2 text-ink/70">
                <Utensils aria-hidden className="size-4 text-brass" />
                <dt className="sr-only">Seating</dt>
                <dd>Indoor & garden seating for 90</dd>
              </div>
            </dl>
            <ul className="mt-7 space-y-2.5 text-ink/70">
              {cafeIntro.highlights.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                  {point}
                </li>
              ))}
            </ul>
            <WhatsAppButton
              size="lg"
              className="mt-9"
              label="Reserve a table"
              message={waMessages.table}
            />
          </Reveal>

          <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <SmartImage
              alt="The garden cafe seating area"
              label="Cafe — garden seating"
              seed={1}
              sizes="(max-width:1024px) 100vw, 45vw"
            />
          </Reveal>
        </div>

        {/* Short menu */}
        <div className="mt-20">
          <h2 className="font-display text-3xl text-forest">A few things off the menu</h2>
          <p className="mt-2 max-w-xl text-sm text-ink/60">
            A short selection — the full card is available at the table, and changes with the season.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {menu.map((category) => (
              <Card key={category.id} className="hover:shadow-none">
                <div className="p-7">
                  <h3 className="font-display text-2xl text-forest">{category.name}</h3>
                  {category.blurb ? (
                    <p className="mt-1 text-sm text-ink/55">{category.blurb}</p>
                  ) : null}
                  <ul className="mt-6 space-y-4">
                    {category.items.map((item) => (
                      <li key={item.name} className="flex justify-between gap-6">
                        <div>
                          <p className="text-sm font-medium text-ink/85">
                            {item.name}
                            {item.veg ? (
                              <span
                                aria-label="Vegetarian"
                                title="Vegetarian"
                                className="ml-2 inline-block size-2.5 rounded-[2px] border border-green-700 align-middle"
                              >
                                <span className="sr-only">Vegetarian</span>
                              </span>
                            ) : null}
                          </p>
                          {item.description ? (
                            <p className="mt-0.5 text-xs text-ink/50">{item.description}</p>
                          ) : null}
                        </div>
                        {item.price ? (
                          <p className="shrink-0 text-sm tabular-nums text-brass">
                            ₹{item.price}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink/45">
            Prices are indicative and exclusive of applicable taxes.
          </p>
        </div>
      </Section>

      {/* BANQUET */}
      <Section tone="forest" id="events">
        <SectionHeading
          invert
          align="center"
          eyebrow="Banquet & Lawn"
          title={banquetIntro.heading}
          lead={banquetIntro.blurb}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {banquetIntro.spaces.map((space, index) => (
            <Reveal key={space.name} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-mist/15 bg-white/5 p-7">
                <h3 className="font-display text-2xl text-cream">{space.name}</h3>
                <p className="mt-3 flex items-center gap-2 text-sm text-brass-soft">
                  <Users aria-hidden className="size-4" />
                  {space.capacity}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist/70">{space.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="What we host"
          title="Events we run every month"
          lead="Whatever the occasion, one coordinator stays with you from the site visit to the last guest leaving."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {eventTypes.map((event, index) => (
            <Reveal key={event.id} delay={index * 0.07}>
              <Card className="flex h-full flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <SmartImage
                    alt={event.name}
                    label={event.name}
                    seed={index + 2}
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl text-forest">{event.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brass">
                    {event.capacity}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{event.blurb}</p>
                  <ul className="mt-5 space-y-2 text-sm text-ink/70">
                    {event.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 pt-2">
                    <WhatsAppButton
                      label="Check dates"
                      message={waMessages.event(event.name.toLowerCase())}
                    />
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Planning something?"
        lead="Send us the date and rough guest count. We will come back with what is free, what it costs, and a time you can come see the place."
        message={waMessages.banquet}
      />
    </>
  );
}
