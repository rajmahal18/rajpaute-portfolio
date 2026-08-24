# Portfolio Rebuild Notes — Current State

## Architecture

- Vite + React + JavaScript + Tailwind CSS.
- Route-based portfolio using a lightweight History API router rather than content modals.
- Routes include `/`, `/work`, `/work/:slug`, screenshot routes, `/about`, and `/contact`.
- Scroll position is stored per history entry so browser Back/Forward restores the user's previous reading position.
- `public/_redirects` provides SPA fallback for Cloudflare Pages-compatible hosting.

## Visual system

- Pure black and white; dark mode simply swaps foreground/background roles.
- Source Serif 4 for restrained editorial display type and Inter for UI/body copy.
- Desktop content is intentionally narrow and centered: roughly half of a large viewport with large unused margins on both sides.
- Homepage and work indexes are icon-led and image-free. Project screenshots are reserved for case-study pages.
- No gradients, glass effects, colored statuses, decorative motion, fake metrics, or SaaS-card grids.
- Arrow-up-right is now reserved for genuinely external destinations. Internal navigation uses normal directional arrows or no arrow.

## Work presentation

The homepage shows exactly four selected projects, in order:

1. Cotabato Pickleball
2. MPW Dink & Dash 2026
3. MPW Document Tracking System
4. OCM The Clinic EMR and Inventory System

All other projects are available under `/work` as a compact archive. The BIR workflow concept was removed because the project did not proceed.

## Mobile

- Mobile has a dedicated two-row header rather than a compressed desktop nav.
- Project titles, contact details, facts, screenshots, and timeline rows reflow without relying on horizontal scrolling.
- Responsive layout checks were performed at 320, 360, 390, 430, 768, 1024, 1440, and 1920 px using the current CSS geometry; no page-level horizontal overflow was observed in the layout harness.

## Verification note

Outbound npm registry access was unavailable in the execution environment, so a complete dependency install/build could not be completed here. Source validation performed successfully:

- JSX syntax parsed with TypeScript's JSX parser without syntax errors.
- CSS parsed with no stylesheet syntax errors.
- 13 portfolio projects normalize successfully.
- Exactly four selected projects resolve in the required order.
- All route slugs are unique.
- All 43 referenced project image assets exist.
- No BIR project remains in normalized portfolio data.

Run locally before deployment:

```bash
npm ci
npm run lint
npm run build
npm run dev
```

See `AGENTS.md`, `DESIGN_SYSTEM.md`, and `PHASE_3.md` for the current design contract.


## Phase 3.5 polish

- Reduced mobile Selected work title scale and row density so project names read as a compact index instead of oversized headings.
- Added a concise About-page note on current automation/n8n learning and practical AI exploration for career growth.
- Added n8n to the visible tech stack and updated the Cotabato Pickleball case study to reflect its availability-sync automation work.
- Standardized the visible technology label to `Tech stack`.
- Extended scroll-restoration retries and save behavior (`pagehide`) for more reliable Back/Forward context restoration.

## Phase 4

- Added 50 original MTAP-style medium/medium-plus mental-math questions.
- Added a one-question-at-a-time homepage challenge with timed numeric input and different-question `Try again` behavior.
- Added optional personal comparison against Raj's verified benchmark for the exact question.
- Visitor attempts remain entirely local and are never stored by the backend.
- Added an unlinked authenticated owner benchmark route with signed HttpOnly session cookies.
- Added Cloudflare Pages Functions + D1 benchmark persistence; database contains Raj benchmark rows only.


## Phase 4.5

- Added a verified correct answer plus concise `Mental route` explanation to all 50 mental-math questions.
- Added session-based shuffled question rotation: no repeats until the current 50-question deck is exhausted and reshuffled.
- Mental-math result/question state now survives internal navigation through session storage. Active timed attempts are deliberately invalidated after interruption so Back/Forward cannot produce unfair benchmark times.
- Replaced oversized raw-email presentation on Home and Contact with a restrained `Have something worth building?` / `Send me a message` treatment.
- Simplified Contact profile rows so raw social URLs no longer dominate the layout.
- Standardized project fact labels across case-study pages to `Type`, `Role`, `Status`, and `Tech stack`.
- Extended route metadata updates to Open Graph and Twitter title/description fields.
- Extended mental-math validation to require a non-empty solution for every question.

## Phase 4.6

- Added dependency-free `MathText` rendering for stacked fractions and consistent superscripts in both public and owner mental-math interfaces.
- Converted algebraic/fractional notation in the 50-question bank away from ambiguous slash rendering while preserving unit notation such as km/h.
- Added a live GitHub contribution calendar to About, fed by a cached server-side GitHub GraphQL function and rendered entirely in black/white intensity levels.
- Added server-only GitHub token configuration to `.dev.vars.example` and documented production/local setup.
- Kept the contribution calendar locally scrollable on narrow screens so it cannot reintroduce page-level horizontal overflow.

## Phase 4.7

- Added a restrained first-person voice layer across Home, Work, Mental Math, About, GitHub context, project endings, and Contact.
- Added an inline `Quick questions` interaction to About with four prewritten personal answers; no chatbot or modal architecture was introduced.
- Rewrote Mental Math reaction copy to feel like a direct visitor-vs-Raj interaction while preserving the same factual timing/benchmark behavior.
- Corrected stacked fraction vertical alignment so fractions stay visually on the same equation line.
- Added explicit grouping parentheses to the reciprocal algebra question for readability.
