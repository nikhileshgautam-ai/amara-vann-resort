# Where the photographs go

The site renders an on-brand placeholder panel wherever a photograph has not
been supplied yet, so nothing is ever broken. To use a real photo:

1. Drop the file in the matching folder here, e.g. `public/images/rooms/deluxe.jpg`
2. Point the content file at it:
   - Rooms       -> `src/content/rooms.ts`      -> `image: "/images/rooms/deluxe.jpg"`
   - Gallery     -> `src/content/gallery.ts`    -> `image: "/images/gallery/pool.jpg"`
   - Events      -> `src/content/events.ts`
   - Page heroes -> the `image` prop passed to `<PageHero />` in `src/app/**/page.tsx`
   - Home hero   -> `src/components/home/hero.tsx` (`src` on the `<SmartImage />`)

## Guidelines

- Landscape shots: 2400px wide, JPEG, quality ~80. Next.js resizes and serves
  AVIF/WebP automatically, so upload one large version, not several sizes.
- Portrait/room shots: 1600px wide is plenty.
- Keep each file under ~600KB before optimisation.
- Always update the `alt` / `caption` text alongside the image - it is what
  screen readers announce and what Google indexes.
