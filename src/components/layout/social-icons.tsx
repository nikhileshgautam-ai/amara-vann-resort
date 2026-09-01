import type { SVGProps } from "react";

/** Brand marks are not part of lucide, so they live here as inline SVG. */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <path d="M15.5 3H14a4 4 0 0 0-4 4v3H7.5v3.5H10V21h3.5v-7.5H16l.5-3.5h-3V7a1 1 0 0 1 1-1h1.5V3Z" />
    </svg>
  );
}
