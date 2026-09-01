# Push and deploy

The repo is committed on `main` and the working tree is clean. Everything below
runs on **your Windows machine**, where your GitHub credentials live.

---

## 1. Create the GitHub repo

On github.com: **New repository** → name it (e.g. `amara-vann-resort`) →
**Private** → do **not** add a README, .gitignore or licence (the repo already
has them, and an initial commit on GitHub's side would force a merge).

## 2. Push

Open PowerShell in `E:\Claude-Projects\Resort Website`:

```powershell
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If you have the GitHub CLI, steps 1 and 2 collapse into one:

```powershell
gh repo create <repo-name> --private --source=. --remote=origin --push
```

## 3. Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → authorise GitHub → pick the repo.
2. Build settings:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Next.js (Static HTML Export) |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Node version | 20 or later |

   The build detects Cloudflare automatically (`CF_PAGES`) and switches to a
   static export — no separate command needed.

3. **Environment variables** → add for Production:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | your real domain, e.g. `https://amaravann.com` |

   Leave `NEXT_PUBLIC_SITE_INDEXABLE` unset for now. See step 5.

4. Deploy. You get a `*.pages.dev` URL — that is the link to show the client.

## 4. Custom domain

Project → **Custom domains** → **Set up a domain**. If the domain is registered
with Cloudflare the DNS is automatic; otherwise point the nameservers or add
the CNAME they show you. TLS is issued automatically.

Then update `NEXT_PUBLIC_SITE_URL` to the custom domain and redeploy, so
canonical tags, Open Graph URLs, the sitemap and the JSON-LD all agree.

## 5. Launch day only

The site currently serves `noindex` on every page and a `Disallow: /`
robots.txt. That is on purpose — the content is placeholder, and a fictional
resort indexed under the client's domain is much harder to remove than to
prevent.

When the real content is in:

1. Set `NEXT_PUBLIC_SITE_INDEXABLE` = `true` in Cloudflare and redeploy.
2. Confirm `https://yourdomain.com/robots.txt` now says `Allow: /`.
3. Verify the domain in Google Search Console and submit
   `https://yourdomain.com/sitemap.xml`.
4. Create the Google Business Profile — for a local resort that outranks the
   website for "resort near me" searches.

## Before you call it launched

- [ ] Real business name, phone, WhatsApp number, address, map links in `src/content/site.ts`
- [ ] Real photographs (see `public/images/README.md` for sizing — there is no
      server-side image optimisation on a static host)
- [ ] Real reviews in `src/content/testimonials.ts`, or the section removed
- [ ] Every answer in `src/content/faq.ts` confirmed by the owner — these
      commit the business to cancellation and catering terms
- [ ] Real rating and review count in `site.ts`, or the block deleted
- [ ] Tested on a physical iPhone (checklist in README.md)
- [ ] `NEXT_PUBLIC_SITE_INDEXABLE=true` and sitemap submitted
