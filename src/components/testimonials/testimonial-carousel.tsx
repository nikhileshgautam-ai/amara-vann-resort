"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function TestimonialCarousel({ invert = false }: { invert?: boolean }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const current = testimonials[index];

  const move = (delta: number) => {
    setDirection(delta);
    setIndex((value) => (value + delta + testimonials.length) % testimonials.length);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
      {/* Rating summary */}
      <div>
        <p
          className={cn(
            "font-display text-7xl leading-none",
            invert ? "text-cream" : "text-forest"
          )}
        >
          {site.reviews.average}
        </p>
        <div
          className={cn("mt-3 flex gap-1", invert ? "text-brass-soft" : "text-brass")}
          aria-label={`${site.reviews.average} out of 5`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden
              className={cn("size-4", i < Math.round(site.reviews.average) ? "fill-current" : "opacity-25")}
            />
          ))}
        </div>
        <p className={cn("mt-4 text-sm", invert ? "text-mist/70" : "text-ink/60")}>
          Average across {site.reviews.count.toLocaleString("en-IN")} {site.reviews.source}
          {"."}
        </p>
        <p className={cn("mt-6 max-w-xs text-sm leading-relaxed", invert ? "text-mist/55" : "text-ink/50")}>
          We do not filter what appears here. If something goes wrong during your stay,
          tell reception before you leave and we will fix it.
        </p>
      </div>

      {/* Quote */}
      <div className="relative">
        <div className="min-h-[230px] sm:min-h-[190px] lg:min-h-[210px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={current.id}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote
                className={cn(
                  "font-display text-2xl leading-snug md:text-[2rem]",
                  invert ? "text-cream" : "text-forest"
                )}
              >
                <span aria-hidden className="text-brass">“</span>
                {current.quote}
                <span aria-hidden className="text-brass">”</span>
              </blockquote>
              <figcaption
                className={cn("mt-6 text-sm", invert ? "text-mist/65" : "text-ink/55")}
              >
                <span className={cn("font-medium", invert ? "text-mist" : "text-ink/80")}>
                  {current.name}
                </span>
                {" — "}
                {[current.context, current.location].filter(Boolean).join(" · ")}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous review"
            className={cn(
              "grid size-11 place-items-center rounded-full border transition-colors",
              invert
                ? "border-mist/25 text-mist hover:border-brass hover:text-brass"
                : "border-ink/15 text-forest hover:border-brass hover:text-brass"
            )}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next review"
            className={cn(
              "grid size-11 place-items-center rounded-full border transition-colors",
              invert
                ? "border-mist/25 text-mist hover:border-brass hover:text-brass"
                : "border-ink/15 text-forest hover:border-brass hover:text-brass"
            )}
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
          <p
            aria-live="polite"
            className={cn("text-sm tabular-nums", invert ? "text-mist/50" : "text-ink/45")}
          >
            {index + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </div>
  );
}
