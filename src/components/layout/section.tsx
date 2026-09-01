import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "cream" | "white" | "sand" | "forest";
};

const tones = {
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  sand: "bg-sand text-ink",
  forest: "bg-forest text-cream",
};

export function Section({ tone = "cream", className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 md:py-28",
        tone === "forest" && "grain",
        tones[tone],
        className
      )}
      {...props}
    >
      <div className="relative container-page">{children}</div>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  invert?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  invert = false,
  as: Tag = "h2",
  className,
}: HeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "rule-diamond justify-center"
          )}
        >
          {align === "center" ? (
            <span
              aria-hidden
              className={cn(
                "size-1.5 rotate-45",
                invert ? "bg-brass-soft" : "bg-brass"
              )}
            />
          ) : null}
          <p className={cn("eyebrow", invert ? "text-brass-soft" : "text-brass")}>
            {eyebrow}
          </p>
          {align === "center" ? (
            <span
              aria-hidden
              className={cn(
                "size-1.5 rotate-45",
                invert ? "bg-brass-soft" : "bg-brass"
              )}
            />
          ) : null}
        </div>
      ) : null}
      <Tag
        className={cn(
          "balance font-display text-[clamp(2rem,4vw,3.1rem)] leading-[1.08] tracking-[-0.01em]",
          invert ? "text-cream" : "text-forest"
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={cn(
            "pretty mt-5 text-base leading-relaxed md:text-lg",
            invert ? "text-mist/85" : "text-ink/70"
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
