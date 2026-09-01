"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin brass bar across the top while a navigation is in flight. Driven by
 * link clicks rather than a router event API, which the App Router does not
 * expose; the pathname change is what completes it.
 */
export function RouteProgress() {
  const pathname = usePathname();

  // The path we were on when a link was clicked. While it still matches the
  // current path the navigation is in flight; the moment the router commits a
  // new path we clear it during render, so no effect is needed and a later
  // Back to the same path cannot resurrect the bar.
  const [navFrom, setNavFrom] = useState<string | null>(null);

  if (navFrom !== null && navFrom !== pathname) setNavFrom(null);
  const active = navFrom !== null;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      setNavFrom(window.location.pathname);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 overflow-hidden"
    >
      <div
        className={
          active
            ? "h-full w-full origin-left animate-[route-progress_1.4s_ease-out_forwards] bg-brass"
            : "h-full w-full origin-left scale-x-0 bg-brass opacity-0"
        }
      />
    </div>
  );
}
