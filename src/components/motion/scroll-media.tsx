"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Drifts an image inside its own frame as the frame crosses the viewport. The
 * inner layer is over-scaled so the drift never exposes an edge.
 */
export function ScrollMedia({
  children,
  className,
  amount = 6,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  if (reduce) {
    return <div className={cn("clip-round relative overflow-hidden", className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("clip-round relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.16]">
        {children}
      </motion.div>
    </div>
  );
}
