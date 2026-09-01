"use client";

import { useState } from "react";
import { introWillPlay, INTRO_OFFSET } from "@/lib/intro";

/**
 * Delay to add to above-the-fold animations so they are not spent behind the
 * intro curtain. Resolved during the first client render, which keeps the
 * markup identical to the server and only shifts timing.
 */
export function useIntroOffset(): number {
  const [offset] = useState(() =>
    typeof window === "undefined" ? 0 : introWillPlay() ? INTRO_OFFSET : 0
  );
  return offset;
}
