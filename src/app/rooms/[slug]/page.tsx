import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BedDouble, Eye, Maximize, Users, Check } from "lucide-react";
import { rooms, getRoom } from "@/content/rooms";
import { site } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { RoomGallery } from "@/components/rooms/room-gallery";
import { CtaBand } from "@/components/home/cta-band";
import { WhatsAppButton, CallButton } from "@/components/whatsapp/cta-buttons";
import { RoomCard } from "@/components/rooms/room-card";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return { title: "Room not found" };

  return {
    title: room.name,
    description: `${room.summary} ${room.size}, sleeps ${room.occupancy}. From ₹${room.priceFrom.toLocaleString("en-IN")} per night at ${site.legalName}.`,
    alternates: { canonical: `/rooms/${room.slug}` },
    openGraph: { title: `${room.name} | ${site.name}`, url: `/rooms/${room.slug}` },
  };
}

export default async function RoomPage({ params }: Params) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const index = rooms.findIndex((item) => item.slug === room.slug);
  const others = rooms.filter((item) => item.slug !== room.slug).slice(0, 3);

  const facts = [
    { icon: Maximize, label: "Size", value: room.size },
    { icon: Users, label: "Sleeps", value: room.occupancy },
    { icon: BedDouble, label: "Bed", value: room.bed },
    { icon: Eye, label: "View", value: room.view },
  ];

  return (
    <>
      <PageHero eyebrow="Rooms" title={room.name} lead={room.summary} seed={index} image={room.image} />

      <Section tone="cream">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 py-2 text-sm font-medium text-ink/60 transition-colors hover:text-forest"
        >
          <ArrowLeft aria-hidden className="size-4" />
          All rooms
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="min-w-0">
            <dl className="grid grid-cols-2 gap-6 border-y border-ink/10 py-7 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <fact.icon aria-hidden className="size-4 text-brass" />
                  <dt className="mt-2 text-[11px] uppercase tracking-[0.14em] text-ink/45">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-forest">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink/75">
              {room.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-12 font-display text-2xl text-forest">What is in the room</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {room.amenities.map((amenity) => (
                <li key={amenity} className="flex gap-3 text-sm text-ink/70">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
                  {amenity}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl text-forest">Good to know</h2>
            <dl className="mt-5 divide-y divide-ink/10 border-y border-ink/10 text-sm">
              {[
                ["Check-in / out", "1:00 pm / 11:00 am"],
                ["Breakfast", "Included for all occupants"],
                ["Extra bed", "On request, free for children under 6"],
                ["Cancellation", "Free up to 72 hours before check-in"],
              ].map(([term, detail]) => (
                <div key={term} className="flex gap-4 py-3 sm:gap-6">
                  <dt className="w-28 shrink-0 text-ink/50 sm:w-40">{term}</dt>
                  <dd className="text-ink/75">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-ink/10 bg-white p-7 shadow-[0_18px_50px_-30px_rgba(15,29,23,0.4)]">
              <p className="text-sm text-ink/55">Starting from</p>
              <p className="mt-1 font-display text-4xl text-forest">
                ₹{room.priceFrom.toLocaleString("en-IN")}
                <span className="ml-2 align-middle text-sm font-sans text-ink/50">
                  per night
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Rates change with the season and with how full we are. Send us your dates on
                WhatsApp for the exact price — usually within the hour.
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <WhatsAppButton
                  size="lg"
                  label="Check availability"
                  message={waMessages.room(room.name)}
                />
                <CallButton size="lg" label={`Call ${site.phone}`} />
              </div>
              <p className="mt-5 text-center text-xs text-ink/45">
                No booking fee. No advance required to hold a soft enquiry.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="font-display text-3xl text-forest">Photographs</h2>
        <p className="mt-2 max-w-xl text-sm text-ink/60">
          Tap any photograph to see it larger.
        </p>
        <div className="mt-8">
          <RoomGallery roomName={room.name} images={room.gallery} seed={index + 1} />
        </div>
      </Section>

      <Section tone="cream">
        <h2 className="font-display text-3xl text-forest">Other rooms</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, i) => (
            <RoomCard key={other.slug} room={other} index={i} />
          ))}
        </div>
      </Section>

      <CtaBand message={waMessages.room(room.name)} />
    </>
  );
}
