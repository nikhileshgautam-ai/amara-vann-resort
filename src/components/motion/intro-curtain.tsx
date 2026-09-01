"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";
import { introWillPlay } from "@/lib/intro";
import { useScrollLock } from "@/components/motion/use-scroll-lock";

/**
 * First-load curtain, shown once per browser session.
 *
 * It is rendered on the server too, so the page never flashes before the
 * curtain covers it. The client then decides in an effect whether to play the
 * lift or drop it instantly (repeat visit within the session, or reduced
 * motion). globals.css hides it entirely when JavaScript is unavailable.
 */
/** The decision never changes after load, so there is nothing to subscribe to. */
const subscribe = () => () => {};
const getClientPhase = () => (introWillPlay() ? "play" : "instant");
const getServerPhase = () => "initial" as const;

export function IntroCurtain() {
  // "initial" during the server pass, so the curtain is in the HTML and the
  // page never flashes before it. React then re-renders with the client
  // snapshot: "play" on a first visit, "instant" on a repeat visit or under
  // reduced motion, where the curtain is simply never there.
  const phase = useSyncExternalStore(subscribe, getClientPhase, getServerPhase);
  const [lifted, setLifted] = useState(false);

  useScrollLock(phase === "play" && !lifted);

  useEffect(() => {
    if (phase !== "play" || lifted) return;
    const timer = window.setTimeout(() => setLifted(true), 1150);
    return () => window.clearTimeout(timer);
  }, [phase, lifted]);

  if (phase === "instant") return null;

  const revealing = phase === "play" && !lifted;

  return (
    <AnimatePresence>
      {!lifted ? (
        <motion.div
          key="curtain"
          id="intro-curtain"
          aria-hidden
          className="fixed inset-0 z-[90] flex items-center justify-center bg-forest"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grain absolute inset-0" />
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={revealing ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-4xl text-cream md:text-5xl">{site.name}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-brass-soft">
              Resort · Cafe · Banquet
            </p>
            <motion.span
              className="mx-auto mt-6 block h-px bg-brass-soft/60"
              initial={{ width: 0 }}
              animate={revealing ? { width: 120 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
