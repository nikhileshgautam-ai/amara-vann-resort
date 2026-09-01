import {
  Waves,
  Coffee,
  PartyPopper,
  Flower2,
  Flame,
  Baby,
  Car,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { facilities } from "@/content/facilities";

const icons: Record<string, LucideIcon> = {
  waves: Waves,
  coffee: Coffee,
  party: PartyPopper,
  flower: Flower2,
  flame: Flame,
  baby: Baby,
  car: Car,
  wifi: Wifi,
};

export function FacilityGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
      {facilities.map((facility) => {
        const Icon = icons[facility.icon] ?? Waves;
        return (
          <li
            key={facility.id}
            className="group bg-cream p-6 transition-colors duration-300 hover:bg-white"
          >
            <Icon aria-hidden className="size-6 text-brass" />
            <h3 className="mt-4 font-display text-xl text-forest">{facility.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{facility.blurb}</p>
          </li>
        );
      })}
    </ul>
  );
}
