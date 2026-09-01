"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartImage } from "@/components/media/smart-image";
import { useScrollLock } from "@/components/motion/use-scroll-lock";

export type LightboxItem = { caption: string; image?: string; seed?: number };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

/** Shared image viewer. Escape closes, arrow keys move, focus returns on close. */
export function Lightbox({ items, index, onIndexChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);
  const open = index !== null;

  useScrollLock(open);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onIndexChange(null);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, go, onIndexChange]);

  const current = index !== null ? items[index] : null;

  // Rendered through a portal so the overlay is a child of <body> and stays
  // viewport-fixed regardless of any transformed ancestor (the page
  // transition wrapper is one). Nothing renders during the server pass.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {current ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[60] flex items-center justify-center overscroll-contain bg-ink/95 p-4"
          onClick={() => onIndexChange(null)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => onIndexChange(null)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X aria-hidden className="size-5" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
              >
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  go(1);
                }}
                aria-label="Next image"
                className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
              >
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </>
          ) : null}

          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <SmartImage
                src={current.image}
                alt={current.caption}
                label={current.caption}
                seed={current.seed ?? index ?? 0}
                sizes="90vw"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-mist/75">
              {current.caption}
              {items.length > 1 ? (
                <span className="ml-2 text-mist/40">
                  {(index ?? 0) + 1} / {items.length}
                </span>
              ) : null}
            </figcaption>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
