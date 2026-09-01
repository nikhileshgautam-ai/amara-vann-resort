import Link from "next/link";
import { ArrowRight, BedDouble, Maximize, Users } from "lucide-react";
import type { Room } from "@/types";
import { Card } from "@/components/ui/card";
import { SmartImage } from "@/components/media/smart-image";
import { TiltMedia } from "@/components/motion/tilt-media";
import { WhatsAppButton } from "@/components/whatsapp/cta-buttons";
import { waMessages } from "@/lib/whatsapp";

export function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  return (
    <Card className="flex h-full flex-col">
      <TiltMedia className="aspect-[4/3]">
        <SmartImage
          src={room.image}
          alt={room.name}
          label={room.name}
          seed={index}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </TiltMedia>
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold text-forest">
        From ₹{room.priceFrom.toLocaleString("en-IN")} / night
      </span>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-forest">
          <Link href={`/rooms/${room.slug}`} className="after:absolute after:inset-0">
            {room.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{room.summary}</p>

        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/55">
          <div className="flex items-center gap-1.5">
            <Maximize aria-hidden className="size-3.5 text-brass" />
            <dt className="sr-only">Size</dt>
            <dd>{room.size}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Users aria-hidden className="size-3.5 text-brass" />
            <dt className="sr-only">Sleeps</dt>
            <dd>{room.occupancy}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <BedDouble aria-hidden className="size-3.5 text-brass" />
            <dt className="sr-only">Bed</dt>
            <dd>{room.bed}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4">
          <WhatsAppButton
            size="sm"
            label="Check availability"
            message={waMessages.room(room.name)}
            className="relative z-10"
          />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-forest">
            Details
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Card>
  );
}
