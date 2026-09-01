"use client";

import { useEffect } from "react";

let locks = 0;
let restoreScrollY = 0;

/**
 * Locks background scrolling while an overlay is open.
 *
 * `overflow: hidden` on <body> is not enough on iOS Safari - the page keeps
 * scrolling behind the overlay. Pinning the body with `position: fixed` and a
 * negative offset is the approach that actually holds there, so the scroll
 * position has to be captured and restored by hand.
 *
 * Reference counted, because the navbar menu, the lightbox and the intro
 * curtain can each want the lock and must not clear each other's.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    locks += 1;

    if (locks === 1) {
      restoreScrollY = window.scrollY;
      const { style } = document.body;
      style.position = "fixed";
      style.top = `-${restoreScrollY}px`;
      style.left = "0";
      style.right = "0";
      style.width = "100%";
      style.overflow = "hidden";
    }

    return () => {
      locks -= 1;
      if (locks > 0) return;

      const { style } = document.body;
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      style.overflow = "";

      // Jump straight back - an animated scroll here reads as a glitch.
      window.scrollTo({ top: restoreScrollY, behavior: "instant" as ScrollBehavior });
    };
  }, [active]);
}
