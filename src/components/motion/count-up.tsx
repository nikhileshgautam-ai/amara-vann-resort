"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts to a number the first time it scrolls into view. Reduced motion (and
 * the server pass) shows the final value immediately, so the figure is never
 * missing or wrong for anyone.
 */
export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const target = Number.parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const numeric = Number.isFinite(target);

  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!numeric || reduce || !inView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
      onComplete: () => setDisplay(value),
    });

    return () => controls.stop();
  }, [inView, numeric, reduce, target, duration, decimals, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
