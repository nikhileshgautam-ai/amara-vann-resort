import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  testimonial,
  invert = false,
}: {
  testimonial: Testimonial;
  invert?: boolean;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border p-7",
        invert ? "border-mist/15 bg-white/5" : "border-ink/8 bg-white"
      )}
    >
      <Quote
        aria-hidden
        className={cn("size-7", invert ? "text-brass-soft/60" : "text-brass/40")}
      />
      <blockquote
        className={cn(
          "mt-4 flex-1 text-[15px] leading-relaxed",
          invert ? "text-mist/85" : "text-ink/75"
        )}
      >
        {testimonial.quote}
      </blockquote>
      <div
        className={cn(
          "mt-6 flex items-center gap-1",
          invert ? "text-brass-soft" : "text-brass"
        )}
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            aria-hidden
            className={cn("size-3.5", i < testimonial.rating ? "fill-current" : "opacity-25")}
          />
        ))}
      </div>
      <figcaption className="mt-3">
        <span
          className={cn(
            "font-display text-lg",
            invert ? "text-cream" : "text-forest"
          )}
        >
          {testimonial.name}
        </span>
        <span
          className={cn(
            "block text-xs",
            invert ? "text-mist/55" : "text-ink/50"
          )}
        >
          {[testimonial.context, testimonial.location].filter(Boolean).join(" · ")}
        </span>
      </figcaption>
    </figure>
  );
}
