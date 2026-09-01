import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/layout/section";
import { RoomCard } from "@/components/rooms/room-card";
import { CtaBand } from "@/components/home/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { rooms } from "@/content/rooms";
import { site } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Rooms, Cottages & Villas",
  description: `Four room categories at ${site.legalName} in ${site.address.city} — garden rooms, pool-view rooms, private cottages and a two-bedroom family villa. Complimentary breakfast included.`,
  alternates: { canonical: "/rooms" },
  openGraph: { title: `Rooms & Cottages | ${site.name}`, url: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay with us"
        title="Rooms, cottages and villas"
        lead="Twenty-four keys across four categories. Every one of them includes breakfast, pool access and a view of something growing."
        seed={3}
      />

      <Section tone="cream">
        <SectionHeading
          title="Pick the one that suits your trip"
          lead="Rates vary by season and by how far ahead you book. Message us with your dates and we will send the current price and what is actually available."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <Reveal key={room.slug} delay={index * 0.07}>
              <RoomCard room={room} index={index} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            {
              title: "Included with every room",
              items: [
                "Breakfast for all occupants",
                "Pool and trail access",
                "Property-wide Wi-Fi",
                "Free parking",
              ],
            },
            {
              title: "Good to know",
              items: [
                "Check-in 1:00 pm, check-out 11:00 am",
                "Early check-in subject to availability",
                "Children under 6 stay free",
                "Outside food is not permitted",
              ],
            },
            {
              title: "On request",
              items: [
                "Airport pickup and drop",
                "In-room dining until 11:00 pm",
                "Bonfire and barbecue setup",
                "Spa appointments, a day ahead",
              ],
            },
          ].map((block) => (
            <div key={block.title}>
              <h2 className="font-display text-2xl text-forest">{block.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Have your dates?"
        lead="Send them across and we will confirm availability and the best rate we can do for that window."
        message={waMessages.stay}
      />
    </>
  );
}
