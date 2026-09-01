"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { SmartImage } from "@/components/media/smart-image";
import { Lightbox } from "@/components/gallery/lightbox";

/** Thumbnail strip on a room page. Opens the shared viewer. */
export function RoomGallery({
  roomName,
  images,
  seed = 0,
}: {
  roomName: string;
  images?: string[];
  seed?: number;
}) {
  const [active, setActive] = useState<number | null>(null);

  const shots = ["The room", "The bathroom", "The sit-out", "The view"].map(
    (angle, index) => ({
      caption: angle,
      label: `${roomName} — ${angle.toLowerCase()}`,
      image: images?.[index],
      seed: seed + index,
    })
  );

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {shots.map((shot, index) => (
          <li key={shot.caption}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View larger: ${shot.label}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl"
            >
              <SmartImage
                src={shot.image}
                alt={shot.label}
                label={shot.caption}
                seed={shot.seed}
                sizes="(max-width: 640px) 50vw, 22vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Expand aria-hidden className="size-5 text-white" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox items={shots} index={active} onIndexChange={setActive} />
    </div>
  );
}
