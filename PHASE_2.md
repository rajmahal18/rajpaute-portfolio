# Phase 2 — Polish Pass

Phase 2 keeps the original black-and-white direction but removes the parts that made the first rebuild feel oversized or template-derived.

## Changes

- Recalibrated the entire type scale and layout density so the site feels visually zoomed out rather than oversized.
- Increased the usable desktop canvas while keeping large, deliberate whitespace.
- Replaced the homepage 2×2 project-card grid with a full-width editorial selected-work index. The same selected-work language is reused on `/work`.
- Replaced the remaining-project card grid with a compact text-first archive list.
- Removed button-heavy hero treatment; primary homepage navigation now uses restrained text links and the arrow-up-right motif.
- Simplified the About page and removed numbered principle-card language in favor of three direct working principles.
- Reduced the oversized Contact treatment while keeping the email as the primary action.
- Changed the display face from Cormorant Garamond to Source Serif 4 for a quieter, less fashion-template feel while retaining editorial contrast with Inter.
- Reduced project-page title, body, and case-study scale and made the live-site CTA a text action rather than a filled button.
- Reworked the mobile header into two intentional rows: brand/theme on top, primary navigation below.
- Removed the root causes of mobile horizontal overflow: no compressed desktop nav, long flex text is allowed to shrink/wrap, and grid/flex children are explicitly shrinkable.
- Added a final `overflow-x: clip` safety boundary at the document root; the layout itself no longer depends on hiding oversized desktop components.
- Retained route-based navigation, per-history-entry scroll restoration, black/white inversion, grayscale project imagery, and page-based screenshot viewing.

## Mobile QA targets

Check at 320, 360, 375, 390, and 430 CSS px:

- no horizontal page scroll
- sticky header stays within viewport
- all nav targets remain comfortably tappable
- long project names wrap without pushing arrows outside the viewport
- email address wraps safely
- work archive rows remain readable
- project facts and case-study copy stay single-column
- Back navigation restores the prior page and scroll position

## Verification performed in this environment

- JavaScript/JSX source parsed successfully with the available TypeScript parser in no-resolve mode.
- Project metadata loads successfully: 14 projects, four featured projects in the required order, and unique slugs.
- All referenced project image assets in `public/` resolve to existing files.
- CSS was parsed successfully during the polish pass with no syntax errors.
- Responsive layout was exercised at 320, 360, 375, 390, 430, 768, 1024, and 1440 CSS px for Home, Work, project detail, About, and Contact; no page-level horizontal overflow was detected in the layout harness.
- A full Vite build was not executed here because npm registry access was unavailable in the sandbox. Run `npm ci`, `npm run lint`, and `npm run build` locally before deployment.
