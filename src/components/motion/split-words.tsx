"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIntroOffset } from "@/components/motion/use-intro-offset";

/**
 * Reveals a headline word by word, each word rising out of its own clipping
 * box. The visible text is aria-hidden and the whole phrase is announced once
 * via aria-label, so assistive tech hears a sentence rather than a word list.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  waitForIntro = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Hold until the intro curtain has lifted. For above-the-fold headings. */
  waitForIntro?: boolean;
}) {
  const reduce = useReducedMotion();
  const introOffset = useIntroOffset();
  const start = delay + (waitForIntro ? introOffset : 0);

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="mr-[0.26em] inline-block"
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.85,
              delay: start + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Same idea for a block of prose - one fade, no per-word staggering. */
export function FadeIn({
  children,
  delay = 0,
  className,
  waitForIntro = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  waitForIntro?: boolean;
}) {
  const reduce = useReducedMotion();
  const introOffset = useIntroOffset();
  const start = delay + (waitForIntro ? introOffset : 0);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: start, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
