"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/** framer exposes jump() to set a spring without animating; typed defensively. */
function jump(value: MotionValue<number>, to: number) {
  (value as unknown as { jump?: (v: number) => void }).jump?.(to);
}

/**
 * A "View" bubble that follows the pointer across a gallery.
 *
 * Returns the element to render plus the handlers to spread on the container,
 * so the gallery keeps ownership of its own markup. Mouse only — on touch
 * there is no pointer to follow, and the bubble would sit under a fingertip.
 */
export function useCursorBubble(label = "View"): {
  bubble: ReactNode;
  handlers: {
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerEnter: (event: PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
  };
} {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.4 });

  const track = (event: PointerEvent<HTMLElement>) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  const handlers = {
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (reduce || event.pointerType !== "mouse") return;
      track(event);
    },
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      if (reduce || event.pointerType !== "mouse") return;
      // Place the bubble before showing it, or it flies in from the corner.
      track(event);
      jump(springX, event.clientX);
      jump(springY, event.clientY);
      setVisible(true);
    },
    onPointerLeave: () => setVisible(false),
  };

  const bubble = reduce ? null : (
    <AnimatePresence>
      {visible ? (
        <motion.span
          aria-hidden
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest shadow-lg"
          style={{ left: springX, top: springY }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );

  return { bubble, handlers };
}
