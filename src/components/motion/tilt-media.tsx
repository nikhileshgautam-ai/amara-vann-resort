"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shifts an image a few pixels against the pointer, which reads as depth
 * without the seasick feel of a full 3D tilt. Mouse only.
 */
export function TiltMedia({
  children,
  className,
  amount = 10,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  if (reduce) {
    return <div className={cn("clip-round relative overflow-hidden", className)}>{children}</div>;
  }

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(-px * amount);
    y.set(-py * amount);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("clip-round relative overflow-hidden", className)}
    >
      <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 scale-[1.06]">
        {children}
      </motion.div>
    </div>
  );
}
