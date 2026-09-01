/**
 * Whether the intro curtain plays on this page load, decided once and cached
 * for the lifetime of the document.
 *
 * Every animated element above the fold needs the same answer, and effect
 * ordering between sibling components is not something to rely on - so the
 * first caller decides and everyone else gets the cached result, whatever
 * order they ask in.
 */

export const INTRO_SEEN_KEY = "intro-seen";

/** Hold plus lift, in seconds. Above-the-fold motion waits this long. */
export const INTRO_OFFSET = 1.35;

let decision: boolean | null = null;

export function introWillPlay(): boolean {
  if (typeof window === "undefined") return false;
  if (decision !== null) return decision;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let seen = false;
  try {
    seen = window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    // Blocked storage: treat as a first visit rather than failing.
  }

  decision = !seen && !reduce;

  if (decision) {
    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Not remembering just means it may play again next load.
    }
  }

  return decision;
}
