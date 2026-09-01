# Project notes

Static marketing site for a resort + cafe + banquet hall. Next.js 16 App Router,
TypeScript, Tailwind v4, Framer Motion, lucide-react. Deployed on Vercel.

## Hard constraints (agreed with the client)

- No login, registration, user accounts or admin dashboard.
- No payment gateway, cart or checkout.
- No database and no Supabase — all content is static and typed.
- No contact form. Conversion happens through WhatsApp, phone and directions.

## Conventions

- All business content lives in `src/content/*.ts`. Never hard-code a phone
  number, address or price inside a component.
- Server Components by default. `"use client"` only for the navbar, the gallery
  grid, the floating WhatsApp button and the motion `Reveal` wrapper.
- `SmartImage` renders a branded placeholder when no photo has been supplied;
  pass `src` once a real image exists in `public/images/`.
- WhatsApp links are always built with `whatsappUrl()` from `src/lib/whatsapp.ts`
  so the number and encoding stay in one place.
- Motion is entrance-only and must respect `prefers-reduced-motion`.

## Before shipping

`npm run build`, `npx eslint .`, `npm audit`, and replace the placeholders
listed in README.md.
