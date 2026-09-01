"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { galleryItems, galleryCategories } from "@/content/gallery";
import { SmartImage } from "@/components/media/smart-image";
import { Lightbox } from "@/components/gallery/lightbox";
import { useCursorBubble } from "@/components/gallery/cursor-bubble";
import { cn } from "@/lib/utils";

type Category = (typeof galleryCategories)[number];

export function GalleryGrid() {
  const [filter, setFilter] = useState<Category>("All");
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const { bubble, handlers } = useCursorBubble("View");

  const items = galleryItems.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <div>
      <div role="tablist" aria-label="Filter gallery" className="mb-10 flex flex-wrap gap-2">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={filter === category}
            onClick={() => {
              setFilter(category);
              setActive(null);
            }}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
              filter === category
                ? "border-forest bg-forest text-cream"
                : "border-ink/15 text-ink/65 hover:border-forest/50 hover:text-forest"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <ul {...handlers} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map((item, index) => (
          <motion.li
            key={item.id}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn("relative", index % 5 === 0 && "md:row-span-2")}
          >
            <button
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "group relative block w-full overflow-hidden rounded-xl",
                index % 5 === 0 ? "aspect-[3/4] md:h-full" : "aspect-[4/3]"
              )}
              aria-label={`View larger: ${item.caption}`}
            >
              <SmartImage
                src={item.image}
                alt={item.caption}
                label={item.caption}
                seed={index + 1}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <span className="reveal-on-hover pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.caption}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      {bubble}

      <Lightbox
        items={items.map((item, index) => ({
          caption: item.caption,
          image: item.image,
          seed: index + 1,
        }))}
        index={active}
        onIndexChange={setActive}
      />
    </div>
  );
}
