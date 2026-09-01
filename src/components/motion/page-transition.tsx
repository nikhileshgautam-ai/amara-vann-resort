"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Enter-only route transition. The App Router unmounts the old tree before an
 * exit animation could run, so we animate the incoming page rather than
 * pretending to cross-fade.
 *
 * The Lightbox renders through a portal precisely because this wrapper leaves a
 * transform on the subtree, which would otherwise become the containing block
 * for any position: fixed descendant.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
