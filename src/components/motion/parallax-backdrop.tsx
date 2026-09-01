"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Moves a full-bleed backdrop slower than the page as it scrolls. The backdrop
 * is over-sized so no gap appears at either end of the travel.
 */
export function ParallaxBackdrop({
  children,
  distance = 90,
}: {
  children: ReactNode;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  if (reduce) {
    return <div className="absolute inset-0">{children}</div>;
  }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-x-0 -bottom-24 -top-24">
        {children}
      </motion.div>
    </div>
  );
}
