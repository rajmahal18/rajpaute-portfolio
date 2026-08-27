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


## Math animation phase 1

- Added a dependency-free monochrome SVG stick figure beside/in the Mental Math section as the site's first deliberate living presence.
- The scene draws itself in once, reacts locally to pointer position, and supports a short tap/click equation construction.
- Mental Math state drives restrained character cues for active, correct, wrong, and interrupted attempts.
- Wide desktop uses the intentional side whitespace; smaller screens fold the scene back into the section without page-level overflow.
- Added a reduced-motion static mode and kept all animation logic scoped to Mental Math rather than generalizing motion across the portfolio.

## Math animation phase 2

- Replaced the Mental-Math-only decorative scene with a persistent `MathCompanion` mounted at the app shell level on public routes.
- The companion now walks/paces in the viewport as the visitor scrolls and subtly follows global pointer direction with its head/body.
- Real UI clicks now cue character reactions. Mental Math start/check/next controls have their own cues; ordinary buttons can trigger a short point/look response without delaying the actual control. Theme switching now uses the dedicated character-led shutter choreography described below.
- Clicking/tapping the companion cycles through a baseline math-spawn vocabulary: operators plus circle, triangle, square, angle, and vector figures. Spawn count is capped and objects self-remove so the page cannot become a permanent symbol cloud.
- Mental Math results now signal the global companion: correct and wrong answers trigger distinct poses plus `=` / `≠` math objects.
- Added an idle/rest state so animation stops after user activity instead of looping forever.
- Kept the implementation dependency-free and added a static non-spawning reduced-motion mode.
- Removed the Phase 1 hard-coded `3 × 4 = 12` scene and its section-local floating visual noise.

## Math companion Phase 2 polish — restrained scroll mapping + character-led shutter

- Removed the visible full-width progress/floor line. The companion's horizontal position still maps to current-page scroll progress, but the coordinate system is now invisible so it does not steal attention.
- Reduced the figure footprint substantially on desktop and mobile so it reads as a secondary living detail rather than a competing focal point.
- Recalibrated locomotion around shorter distance-driven stride cycles and added knee/foot articulation to reduce the sliding impression.
- Abandoned the theme shuriken/projectile interaction.
- The companion now operates the theme shutter itself: for dark it reaches the top and pulls downward, rests briefly at the bottom, then returns; for light it reaches the bottom and pulls upward, rests briefly at the top, then returns.
- Moved the shutter behind the foreground content. The app foreground stays readable through the black/white wipe instead of being covered by the transition layer.
- Theme choreography remains fully non-blocking: curtain and companion layers do not intercept page interaction, and scroll targets continue updating while the sequence runs.
- Reduced-motion behavior remains immediate/static.

## Math companion motion polish — planted gait, math trail, and continuous curtain coordinates

- Reworked the walking cycle around stance/swing phases so the planted foot visually counters horizontal body movement instead of both legs simply oscillating while the stage slides.
- Added an intentionally tiny movement-only math trail at foot contacts. Marks are capped, faint, short-lived, and never remain after locomotion stops.
- Added an unboxed velocity annotation (`v = … u/s`) driven by the companion's actual horizontal spring velocity; it appears only while walking/running and fades at rest.
- Separated the normal track target Y from the live stage Y. Scroll/resize updates can continue during theme choreography without overwriting the character's current vertical position.
- Removed CSS stage-transform curtain jumps. Theme prep, pull, edge hold, and rejoin now move the stage through one requestAnimationFrame coordinate path, so each phase starts exactly where the last phase ended.
- Added proper leap/drop/landing body poses for edge travel and slowed the shutter from the earlier 620 ms wipe to a more deliberate 1000 ms pull, with a 700 ms preparation/reach window.
- Theme remains fully non-blocking and the curtain remains behind foreground content.


## Math companion Phase 3 — idle, gait states, sound, and π navigation

- Added two-stage inactivity behavior: relaxed rest followed by a cross-legged seated idle pose; the figure now stands up before resuming movement or interaction.
- Added velocity/progress-gap gait state switching with hysteresis: walk → brisk → run → sprint. Each gait has different stride/cadence/body mechanics rather than sharing one sped-up walk.
- Kept the existing ephemeral velocity annotation and tiny math foot trail; faster gaits only increase their movement expression, not their screen persistence.
- Added dependency-free synthesized Web Audio for theme choreography: a restrained curtain swish and quiet landing taps, unlocked only from the user's theme-button gesture. No files were added to `public/`.
- Added a cancelable router intent hook so the persistent companion can animate internal navigation without coupling portals to specific pages or buttons.
- Added a short-lived monochrome π portal that spawns from the companion's exact current viewport position and pre-click facing direction; navigation targets no longer rotate it before portal placement. Route commit occurs while the figure is inside; it exits from the same local portal and then rejoins the new page's scroll target.
- Portal choreography yields to active theme choreography so navigation never blocks or corrupts the shutter sequence. Reduced-motion navigation stays immediate.

## Math animation Phase 4 — dual theme toggle

- Added a random two-mode theme transition: the existing physical curtain or a new companion-powered light-source transition.
- Power mode keeps the figure in place, builds a restrained gray energy aura, then expands white light from the figure for light mode or contracts the remaining light back into the figure for dark mode.
- The radial theme layer remains behind foreground content and pointer-transparent, so browsing continues during the effect.
- The radial origin follows the companion's live viewport position rather than any portfolio section or theme-button coordinate.
- Kept curtain choreography/audio intact and added no new assets to `public/`.

### Math companion — Son Goku polish pass
- Enlarged the existing π portal exactly 1.25× without redesigning it; entry travel now continues slightly past the portal center before route commit.
- Doubled the gray power aura footprint. Persistent power is valid only after dark → light via power; curtain-sourced light and every dark-mode result clear it explicitly.
- Stabilized the idle timer across public routes so ResizeObserver/layout settling cannot repeatedly reset the seated-idle countdown.
- Added direct pointer drag with subtle body/limb lag, capped release inertia, floor recovery, and automatic return to the existing scroll-follow routine.

## Math animation Phase 5 — jointed stickman foundation

- Rebuilt the visible stickman around one consistent articulated SVG hierarchy instead of mostly rigid single-segment arms/legs.
- Added independent shoulder/elbow/wrist and hip/knee/foot transforms, restrained curved limb paths, subtle spine bend, and head counter-rotation.
- Extended the distance-driven gait engine so elbow flex, knee lift, ankle counter-rotation, spine motion, and head stabilization share the same gait phase across walk, brisk walk, run, and sprint.
- Retrofitted existing seated idle, rest, stand-up, dragging, jump/landing, curtain, portal, Mental Math reactions, and power-up poses to the same joint hierarchy.
- Kept the implementation dependency-free and preserved all existing route/theme/portal semantics; this pass changes character articulation rather than adding another interaction feature.


## Math animation Phase 5 polish — run, power, and portal continuity

- Reworked run/sprint mechanics to remove the sideways-arm pose: mirrored inward elbow flex, stronger forward drive, higher knee recovery, and capped ankle compensation.
- Replaced the cartoon flame-line aura with a layered gray energy field and added a distinct calm powered stance.
- Power state now persists only after dark → light via power; curtain transitions and any dark result clear it.
- Smoothed the Super Saiyan radial theme effect with GPU transform scaling from the companion's live coordinates so the figure reads as the source of light.
- Corrected π entry travel to continue in the facing direction and moved route commit later so the character is fully through the doorway first.


## Math companion continuity polish — portal + powered theme source

- Fixed intermittent π entry misses, especially at the far-left/far-right viewport edges, by deriving travel direction and depth from the actual clamped portal coordinate and committing the route only after entry motion completes.
- Paired theme transition semantics: the effect selected for dark → light is reused for light → dark. Curtain-created/default light never invokes power just to turn dark.
- Power-to-dark keeps the current aura through the contraction and clears it only during recovery.
- Reworked the gray aura into independently moving flame contours/rising energy strokes and changed the radial light wipe to grow from a body-scale source circle with subtle origin rings.
