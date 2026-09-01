import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const gradients = [
  "linear-gradient(135deg, #0d2018 0%, #1d4638 48%, #6f8d7f 100%)",
  "linear-gradient(135deg, #8f6a3a 0%, #c9b393 55%, #f2e9d9 100%)",
  "linear-gradient(150deg, #0b1712 0%, #24503f 62%, #9b7442 100%)",
  "linear-gradient(135deg, #cdd8d1 0%, #7e9a8c 46%, #23503f 100%)",
  "linear-gradient(145deg, #f2e9d9 0%, #cbb597 42%, #9b7442 100%)",
  "linear-gradient(135deg, #23503f 0%, #83a294 38%, #e9dfcc 100%)",
];

/** A soft off-centre light source, so panels read as lit rather than flat. */
const lights = [
  "radial-gradient(120% 90% at 22% 18%, rgba(255,255,255,0.30), transparent 58%)",
  "radial-gradient(110% 85% at 78% 24%, rgba(255,255,255,0.26), transparent 55%)",
  "radial-gradient(130% 95% at 50% 88%, rgba(255,255,255,0.22), transparent 60%)",
];

type Props = {
  /** Path under /public, e.g. "/images/gallery/pool.jpg". Omit to show a placeholder. */
  src?: string;
  alt: string;
  /** Shown on the placeholder so the client knows which photo belongs here. */
  label?: string;
  /** Varies the placeholder gradient so grids do not look repetitive. */
  seed?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Full-bleed backdrops (heroes) render the gradient alone - a centred icon
   * behind headline text reads as a broken image.
   */
  plain?: boolean;
};

/**
 * Renders a real photograph when one has been added, and an on-brand
 * placeholder panel until then. Every consumer sets its own aspect ratio on
 * the wrapper, so swapping in photos needs no layout changes.
 */
export function SmartImage({
  src,
  alt,
  label,
  seed = 0,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  plain = false,
}: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "grain absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden text-center",
        className
      )}
      style={{ backgroundImage: gradients[seed % gradients.length] }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: lights[seed % lights.length] }}
      />
      <div aria-hidden className="weave absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 120px 24px rgba(11,23,18,0.34)",
        }}
      />
      {plain ? null : (
        <ImageIcon aria-hidden className="relative size-5 text-white/65" />
      )}
      {label && !plain ? (
        <span className="relative max-w-[80%] text-[11px] font-medium uppercase tracking-[0.16em] text-white/75">
          {label}
        </span>
      ) : null}
    </div>
  );
}
