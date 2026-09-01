# Amara Vann — Resort, Cafe & Banquet website

A single, static marketing site for a resort with a garden cafe and a banquet
lawn. Built to do one job: make the property look good and make it effortless to
reach the business on WhatsApp or by phone.

There is **no login, no admin panel, no database and no payment gateway**, by
design. Every page is pre-rendered as static HTML.

## Stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router, Server Components)     |
| Language   | TypeScript                                     |
| Styling    | Tailwind CSS v4                                |
| Components | shadcn-style primitives in `src/components/ui` |
| Motion     | Framer Motion (entrance reveals only)          |
| Icons      | lucide-react                                   |
| Fonts      | Self-hosted via Fontsource (no external calls) |
| Hosting    | Vercel (or any static-capable host)            |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Changing the business content

**Everything the client will want to edit lives in `src/content/`.** No component
contains hard-coded business information.

| File                        | Contains                                              |
| --------------------------- | ----------------------------------------------------- |
| `src/content/site.ts`       | Name, phone, WhatsApp number, address, hours, map link |
| `src/content/rooms.ts`      | Room categories, pricing, amenities                    |
| `src/content/menu.ts`       | Cafe intro and the short menu                          |
| `src/content/events.ts`     | Banquet spaces and event types                         |
| `src/content/experiences.ts` | The four signature experiences on the homepage        |
| `src/content/faq.ts`        | FAQ questions and answers (also feeds FAQPage schema)  |
| `src/content/facilities.ts` | Facility grid                                          |
| `src/content/testimonials.ts` | Guest reviews                                        |
| `src/content/gallery.ts`    | Gallery captions and categories                        |

### Before launch — replace these placeholders

Everything below is currently dummy data in `src/content/site.ts`:

- [ ] `name` / `legalName` — the real business name
- [ ] `phone`, `phoneAlt`, `email`
- [ ] `whatsapp.number` — digits only with country code, e.g. `919876543210`
- [ ] `address`, `geo`, `mapsUrl`, `directionsUrl`, `mapEmbedUrl`
- [ ] `url` — the live domain (also set `NEXT_PUBLIC_SITE_URL` in Vercel)
- [ ] `socials` — real Instagram / Facebook links
- [ ] Real photographs — see `public/images/README.md`
- [ ] Real reviews in `testimonials.ts` (do not ship invented ones)
- [ ] `reviews` in `site.ts` — the real Google rating and count, or delete the block
- [ ] Confirm every answer in `faq.ts` with the owner; wrong answers here cost bookings

## How WhatsApp works

`src/lib/whatsapp.ts` builds `https://wa.me/<number>?text=<encoded message>`
links. Each call site passes a message that matches its context — a room page
pre-fills the room name, the banquet section pre-fills an event enquiry. Nothing
sensitive ever goes into the URL.

The number is read from `site.whatsapp.number` in one place, so changing it
changes every button on the site.

## Browser support

**The floor is Chrome 111+, Safari 16.4+, Firefox 128+** — roughly March 2023
onward, iOS 16.4 and up. That floor is set by Tailwind CSS v4, which builds
every opacity utility (`bg-ink/95`, `text-white/80`) on `color-mix()` and relies
on `@property` and cascade layers. It is not something this codebase can patch
around with fallbacks; below that line the site loses its colours, not just a
nicety.

In practice that covers effectively all Android traffic (Chrome auto-updates)
and everything except iPhones stuck on iOS 15 or older — an iPhone 6s or 7 that
was never updated. If the client's audience makes that unacceptable, the fix is
to move off Tailwind v4, which is a rebuild, not a tweak. Worth deciding before
launch rather than after.

Sizing uses `svh` (small viewport height) rather than `vh` so mobile address
bars cannot crop a hero. `env(safe-area-inset-*)` is used for the fixed bottom
bar and landscape padding, which is why `viewportFit: "cover"` is set in
`layout.tsx` — remove it and every safe-area value silently becomes 0.

## Responsive & device testing

Layout is verified automatically across 11 viewports x 7 pages (320px through
1920px, portrait and landscape) for horizontal overflow, tap-target size and
runtime errors. Re-run that sweep after any layout change — horizontal overflow
is the failure users describe as "the site is broken on my phone", and it is
invisible at desktop width.

Fixed by that sweep, and worth not reintroducing:

- **Grid and flex children default to `min-width: auto`**, so a track cannot
  shrink below its content and the page overflows sideways. Two fixed-width
  `dt` label columns caused this on the room and contact pages. Add `min-w-0`
  to grid/flex children that contain text.
- **Buttons are `whitespace-nowrap`**, so a long label cannot shrink. The hero
  CTAs are full width below `sm` for this reason.

### What still needs a real device

This project's automated checks run on Chromium. That verifies layout,
dimensions and touch behaviour, but **not WebKit rendering** — iOS Safari is a
different engine, and it is the one that breaks. Before launch, open the site on
a real iPhone and check:

- [ ] Hero fills the screen and is not cropped as the address bar hides/shows
- [ ] The bottom WhatsApp/Call/Directions bar clears the home indicator
- [ ] Opening the gallery lightbox does not let the page scroll behind it, and
      closing it returns you to the same scroll position
- [ ] Rounded image corners are clean, with no square bleed at the corners
- [ ] The intro curtain lifts and does not leave the page unscrollable
- [ ] `backdrop-blur` on the navbar does not flicker while scrolling
- [ ] Tapping a WhatsApp button opens the WhatsApp app with the message
      pre-filled — the single most important thing on the site

Also worth one pass on a low-end Android for the film grain and Ken Burns
animation, which are the most GPU-hungry things here.

## Motion

All animation lives in `src/components/motion/` and every piece of it is
disabled under `prefers-reduced-motion` — that is a contract, not a nicety.
Verify it before shipping any new effect (DevTools → Rendering → Emulate CSS
`prefers-reduced-motion`).

| Piece | What it does |
| ----- | ------------ |
| `intro-curtain` | Branded curtain on first load, once per browser session |
| `page-transition` | Fade-and-rise on route change (enter only) |
| `route-progress` | Thin brass bar while a navigation is in flight |
| `split-words` | Word-by-word headline reveal, plus a `FadeIn` helper |
| `count-up` | Stat numbers count when scrolled into view |
| `parallax-backdrop` | Hero backdrop moves slower than the page |
| `scroll-media` | Image drifts inside its frame as it crosses the viewport |
| `magnetic` | CTA nudges toward the pointer (mouse only) |
| `tilt-media` | Room card image shifts against the pointer (mouse only) |
| `reveal` | The general-purpose scroll-into-view reveal |
| `cursor-bubble` | "View" bubble following the pointer over the gallery |

Two things that are load-bearing and easy to break:

- **`src/lib/intro.ts` decides once whether the curtain plays**, and caches the
  answer. Above-the-fold animations call `useIntroOffset()` to delay themselves
  by that amount, so they are not spent behind the curtain. Do not read the
  `sessionStorage` flag directly from a component — effect order between
  siblings is not guaranteed and you will get the wrong answer.
- **The lightbox renders through a portal into `<body>`.** The page transition
  leaves a transform on the page subtree, and a transformed ancestor becomes
  the containing block for `position: fixed` descendants — the overlay would
  size itself to the page instead of the viewport. Keep the portal.

## Security notes

- No forms, no user input, no database — the largest classes of web
  vulnerability simply do not apply here.
- Security headers (CSP, HSTS, nosniff, frame-deny, Referrer-Policy,
  Permissions-Policy) are set in `next.config.ts`. The CSP is written for this
  app specifically; the only external frame permitted is the Google Maps embed.
- Fonts are self-hosted, so the site makes no third-party requests at all.
- `.env.local` is gitignored. There are no secrets today — keep it that way.
- Run `npm audit` before each deploy.

## Deploying

The site builds to plain static files, so it can go on any static host. The
build auto-detects Cloudflare Pages (which sets `CF_PAGES`) and switches to
`output: "export"` there; `npm run build:static` reproduces that locally.

### Cloudflare Pages

1. Push to GitHub, then in the Cloudflare dashboard: **Workers & Pages → Create
   → Pages → Connect to Git**, and pick the repo.
2. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
3. Environment variables (Settings → Environment variables):
   - `NEXT_PUBLIC_SITE_URL` — the real domain, e.g. `https://amaravann.com`
   - `NEXT_PUBLIC_SITE_INDEXABLE` — leave unset until launch day (see below)
4. Add the custom domain under the project's **Custom domains** tab. TLS is
   issued automatically.

The host must support clean URLs — serving `/gallery` from `gallery.html`.
Cloudflare Pages, Netlify and Vercel all do. A bare `python -m http.server`
does not, so don't judge a build by that.

Security headers come from `public/_headers` on a static host, because
`next.config.ts` `headers()` needs a server and never runs in an export. **The
two lists must be kept in sync by hand.**

### The one real cost of static export

There is no server, so Next.js cannot optimise images at request time —
`images.unoptimized` is set and photos are served exactly as committed. For a
photo-heavy hospitality site on Indian mobile data that matters. Before
committing any photograph:

- Resize to 2400px wide for full-bleed shots, 1600px for cards
- Export as JPEG at quality ~80
- Keep each file under ~400KB

If that turns out not to be enough, `next-image-export-optimizer` does the
resizing at build time, or move to Vercel where it is automatic.

### Launch day

Indexing is **off** until you turn it on. `NEXT_PUBLIC_SITE_INDEXABLE` must be
exactly `true` or the site serves `noindex` plus a `Disallow: /` robots.txt.
That is deliberate: the content ships with an invented business name, invented
reviews and unconfirmed FAQ answers, and getting that out of Google afterwards
is far slower than never being indexed. Turn it on only once the real content
is in, then submit the sitemap in Search Console.

## If a CMS is needed later

Content is already isolated behind the typed files in `src/content/`. Swapping
those for a headless CMS or a database means changing those modules only — the
pages and components read from the same shapes and would not need rewriting.
