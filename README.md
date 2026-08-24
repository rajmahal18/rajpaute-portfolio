# Raj Paute — Portfolio

A Vite + React + Tailwind CSS portfolio rebuilt around a strict black-and-white editorial design system.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Structure

- `/` — home with exactly four selected projects
- `/work` — full work archive
- `/work/:slug` — dedicated project case-study page
- `/work/:slug/screens/:index` — page-based screenshot viewer
- `/about` — background, inline quick questions, current learning, tech stack, live monochrome GitHub activity, credentials
- `/contact` — direct contact and external links
- unlinked owner benchmark route — authenticated mental-math benchmark recording; see `PHASE_4.md`

`public/_redirects` provides SPA fallback routing for Cloudflare Pages-style deployments.

## Design rules

- Pure black-and-white visual system; dark mode simply swaps foreground/background roles.
- No content modals. Meaningful content and project exploration use normal routes/pages.
- The homepage shows only the four most relevant projects, in this order: Cotabato Pickleball, MPW Dink & Dash 2026, MPW Document Tracking System, OCM The Clinic EMR and Inventory System.
- Project cards show the project name without explanatory subtitles. Details are revealed on the project page.
- Large meaningful hit areas: full project tiles are clickable.
- Browser back/forward navigation restores the prior scroll position using route-entry scroll state.
- Sparse composition, generous whitespace, restrained motion, consistent labels, and a single monochrome icon language.
- Mobile is treated as a first-class layout rather than a collapsed desktop grid.
- Home includes one restrained personal mental-math challenge. Each completed attempt reveals the correct answer and a concise mental route; questions rotate without repeats within the session. Visitor attempts stay local; only Raj's verified per-question benchmarks are persisted by the optional Cloudflare backend.

## Content

Project case-study content lives in `src/data/projects.js`. Display-name/order/status normalization lives in `src/data/projectMeta.js`. Site identity, credentials, stack, and timeline content live in `src/data/site.js`.


## Mental math

Phase 4 adds a 50-question original mental-math bank and a one-problem-at-a-time homepage challenge. Phase 4.5 adds answer/solution reveal, session-safe no-repeat rotation, interrupted-attempt handling, contact cleanup, and metadata consistency. Phase 4.6 adds proper inline math typesetting plus the live black-and-white GitHub contribution calendar on About. Phase 4.7 adds the restrained first-person voice layer, About quick questions, and corrected inline fraction alignment. See `PHASE_4.md` through `PHASE_4_7.md`.


## GitHub activity

The About-page contribution calendar is fetched server-side through `functions/api/github/contributions.js` using GitHub GraphQL. Add `GITHUB_TOKEN` to Cloudflare production secrets (or `.dev.vars` for local Wrangler testing). `GITHUB_USERNAME` is optional and defaults to `rajmahal18`. No GitHub token is shipped to the browser.
