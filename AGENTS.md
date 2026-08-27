# Portfolio Rebuild — Non-Negotiable Rules

This repository is Raj Paute's personal portfolio. Preserve these rules in every future edit.

## 1. No AI slop

Do not introduce generic SaaS aesthetics, decorative gradients, glassmorphism, glowing elements, floating blobs, fake metrics, pill overload, card-inside-card layouts, typewriter gimmicks, excessive motion, or cliché portfolio copy. Every visible element must earn its place.

## 2. Homepage work is curated

The homepage shows exactly four selected projects. Everything else belongs on `/work` behind the consistent `View all work` navigation.

## 3. Selected-work order is fixed

1. Cotabato Pickleball
2. MPW Dink & Dash 2026
3. MPW Document Tracking System
4. OCM The Clinic EMR and Inventory System

Do not reorder these unless explicitly requested.

## 4. Pure black and white

The brand is strictly black and white. Gray hierarchy is created only through opacity of black/white. Light mode and dark mode use the same design system with foreground/background roles interchanged. Do not add accent colors, gradients, colored statuses, or theme-specific palettes. Project imagery is rendered in grayscale inside the portfolio.

The portfolio shell must never inherit the theme of an individual project. In particular, do not add pickleball/sports motifs simply because two featured projects involve pickleball.

## 5. Mobile is first-class

Do not treat mobile as a compressed desktop layout. Verify hierarchy, typography, tap targets, spacing, image crops, navigation, and reading order around 320–430 px widths. No page-level horizontal scrolling.

## 6. Navigation should feel connected

If an element naturally represents something explorable, make its meaningful area clickable. Project entries are full-row/full-area links. Avoid tiny hidden click targets. Preserve browser navigation context: returning with Back must restore the prior route-entry scroll position. Do not add code that forces Back navigation to the top.

## 7. Project titles stay clean

On listing/homepage tiles, use the actual catchy project name only. Do not attach explanatory subtitles such as `Tournament Operations Platform` underneath the title. The project page is where the visitor discovers the role, stack, problem, implementation, and outcome.

## 8. Pages, not modals

Project details, screenshots, work archive, About, and Contact are routes/pages. Do not introduce quick-view modals, case-study modals, gallery modals, or modal navigation. A modal is acceptable only for a true confirmation interaction, which this portfolio currently does not need.

## 9. Premium monochrome icons only

Icons must be restrained, minimal, consistent, black-and-white line icons. No emoji, colorful brand icon walls, playful/chunky icons, or mixed icon families. Use icons only when they clarify an action.

Reserve the arrow-up-right / external-link motif for genuinely external destinations such as live sites, resume/certificate links, or other outbound resources. Internal navigation should use normal directional arrows or no arrow at all.

## 10. Space is part of the brand

Prefer generous whitespace, low content density, strong section separation, wide margins, short copy, and fewer elements per viewport. On desktop, the main content column should intentionally occupy only about half of the viewport and remain centered, leaving substantial dead space on both sides. Do not fill empty areas simply because space exists. The site should feel calm, expensive, and confident.

## 11. Typography must feel premium

Use refined, readable typography with a disciplined editorial hierarchy. Avoid novelty/display fonts that feel gimmicky or trend-chasing. The current system uses a restrained serif display face with a clean sans-serif body face.

## 12. Consistency includes vocabulary

Every page must look and read like one system. Keep spacing, type scale, image treatment, borders, icon style, link behavior, hover behavior, theme logic, and responsive rules consistent.

Labels and terminology are part of this rule. Use one vocabulary:

- `Work` — primary project/archive concept
- `Selected work` — the four homepage/featured items
- `More work` — the archive remainder
- `View all work` — archive CTA
- `Back to work` / `Back` — return navigation
- `Visit live site` — external production link
- Project detail labels: `Type`, `Role`, `Status`, `Tech stack`
- Case-study sections: `Overview`, `Challenge`, `Approach`, `Build details`, `Key decisions`, `Screenshots`, `Outcome`, `Next`
- Site pages: `Work`, `About`, `Contact`

Do not alternate between `Projects`, `Portfolio`, `Case Studies`, and `Work` for the same navigation concept unless the user explicitly changes the vocabulary.


## Phase 3 refinements

- Homepage project presentation is image-free and icon-led. Keep large screenshots inside project case studies, not the homepage.
- Use a narrow centered desktop content column; do not expand the shell back toward full-width layouts.
- The interface is icon-centric but not icon-heavy: icons clarify categories/actions and remain from one restrained monochrome family.
- The Bureau of Internal Revenue concept project was removed because it did not proceed. Do not re-add it to portfolio data or navigation.


## Phase 3.5 refinements

- Mobile `Selected work` titles are intentionally smaller than the Phase 3 scale. Listing titles must not compete with hero/page headings on 320–430 px screens.
- `Tech stack` is the canonical visible label for technology summaries; do not alternate it with `Stack`.
- The About page includes a restrained `Currently learning` note for ongoing automation and practical AI exploration. Keep it brief and honest rather than turning the site into an AI-focused identity.
- n8n is part of the current tech stack and may be referenced where it is genuinely used, including Cotabato Pickleball availability automation.
- Scroll restoration remains a first-class behavior. Preserve per-history-entry restoration and allow route content time to settle before giving up on a restored position.

## Phase 4 — Mental math identity

- Mental math is the portfolio's distinctive personal interaction, but it must remain visually subordinate to the portfolio itself and use the exact same black-and-white editorial system.
- Home shows one problem at a time. The prompt stays hidden until `Start`; timing begins when the problem is revealed.
- Numeric/free-response answers only. Do not convert the core challenge to multiple choice.
- `Try again` means a different question. Questions should not repeat within the active browser session until the 50-question bank has been exhausted and reshuffled. Do not add streaks, XP, levels, confetti, gamified progress, public leaderboards, percentiles, or aggregate visitor comparisons.
- Comparison is personal: visitor vs Raj for the exact same question only.
- Never invent Raj benchmark times. Only show a comparison when a verified owner benchmark exists.
- Do not persist visitor attempts, answers, timing, identifiers, or leaderboard data server-side unless Raj explicitly changes this requirement.
- The owner benchmark route remains unlinked. Obscure URL routing is not security; real protection is credential authentication plus a signed HttpOnly session.
- Do not put owner credentials or authentication secrets in Vite/client code. Use server-side Cloudflare environment secrets.
- Preserve free-tier-friendly architecture: static/client-side challenge + tiny benchmark reads + owner-only D1 writes.


## Phase 4.5 — Loose-end polish

- Every completed mental-math attempt shows the correct answer and a concise `Mental route` explanation. Keep explanations short, practical, and mental-math oriented rather than textbook-like.
- Mental-math session state survives normal route navigation. If a visitor leaves during an active timed attempt, invalidate the timer instead of letting navigation produce an unfair time; preserve the question and offer `Try again` for a different problem.
- Do not display Raj's raw email address as oversized page content. Home and Contact use the restrained `Send me a message` mail action instead. The email may remain in the underlying mailto target and icon-only footer action.
- Contact stays intentionally small: one invitation, one mail action, location, social profiles, and resume. Do not add a contact form unless explicitly requested.
- Project facts use the same four labels on every case study: `Type`, `Role`, `Status`, `Tech stack`.
- Metadata should remain synchronized with the current route: document title, description, Open Graph title/description, and Twitter title/description.

## Phase 4.6 — Math rendering and GitHub activity

- Mental-math equations must never fall back to ambiguous raw slash notation when a stacked fraction or superscript improves readability. Render public and owner prompts/solutions through the shared `MathText` component.
- Keep math typography restrained and native to the existing serif/sans system. Do not introduce a visually unrelated equation theme.
- The About page may show the live GitHub contribution calendar, but it must remain monochrome and structurally familiar rather than becoming a custom analytics dashboard.
- GitHub contribution intensity uses only black/white mixing and must invert naturally with the site theme. Never restore GitHub green.
- The contribution graph may use its own local horizontal scroller on narrow screens. It must never create page-level horizontal overflow.
- `GITHUB_TOKEN` is server-side only. Never put GitHub credentials or tokens in Vite/client code.

## Phase 4.7 — Authored voice

- The portfolio should feel like Raj is quietly guiding the visitor, not like a neutral template and not like a chatbot.
- Use short first-person contextual lines only where they add presence: Home, Mental Math, About quick questions, GitHub context, project endings, and Contact.
- Do not turn this into a chat widget, fake AI assistant, typing simulation, speech bubbles, floating prompts, or conversational UI chrome.
- `Quick questions` on About is a small inline disclosure interaction. Answers are prewritten, one at a time, and remain on the page; do not convert them to modals.
- Mental Math result copy may be personal (`Okay, you got me`, `I had this one`) but must remain restrained and never gamified.
- Stacked fractions must align with the surrounding equation line. Do not reintroduce negative vertical alignment that makes the fraction appear to fall below the expression.

## Math animation phase 2 — interactive math companion

- The stick figure is now a site-aware companion rather than a decorative Mental Math illustration. It may remain visible across public routes, pace while the visitor scrolls, follow pointer direction subtly, react to real controls, and respond to Mental Math state. This is the one explicit exception to the portfolio's otherwise restrained motion rules.
- The companion must react to user behavior for a reason. Avoid ambient symbol clouds, random perpetual movement, or decorative animation with no relationship to scroll, pointer, clicks, navigation, theme changes, or Mental Math.
- Math is the companion's interaction language. It can create and throw reusable operators and geometric figures such as `+`, `−`, `×`, `÷`, `=`, `√`, `π`, circles, triangles, squares, angles, and vectors. Keep the vocabulary monochrome and geometry-led.
- Clicking/tapping the figure may deliberately spawn one math object. Never turn this into a game HUD, inventory, score, speech system, chatbot, or mascot panel.
- UI reactions should not hijack controls. Theme switching, forms, and ordinary controls remain immediately usable. Internal navigation has one deliberate exception in Phase 3: when the companion is free, route commit may wait only for the short π-entry beat so the character can visibly cross pages; if another high-priority choreography is active, navigation proceeds immediately.
- Keep the character small and mostly in unused edge whitespace. It must not cover important content or create page-level horizontal overflow, especially on 320–430 px screens.
- Mental Math remains the strongest semantic relationship: starting/checking a problem and correct/wrong results may trigger stronger reactions than ordinary page controls.
- Keep the implementation dependency-free unless a later phase explicitly justifies an animation library.
- Do not add speech bubbles, dialogue chrome, mascot labels, gradients, color, or game HUD elements. Sound is allowed only as a very subtle user-initiated physical cue (currently the curtain swish and tiny landing tap); never add autoplay ambience, music, cartoon effects, or persistent audio. The only particle-like exception is the intentionally tiny movement-only math foot trail defined below. The page cursor itself is never replaced.
- Respect `prefers-reduced-motion`: the companion becomes a quiet static figure and does not spawn animated objects.

## Math companion Phase 2 motion rules

- The companion's **horizontal position** maps left-to-right to scroll progress on the current route, but there is no visible floor/progress line. Do not restore the track unless explicitly requested.
- Locomotion should chase a target smoothly. Walking must read as stepping rather than a translated sprite: use a planted-step stance/swing cycle where the contact foot visually counters body travel, plus knee articulation, foot counter-rotation, and believable acceleration/deceleration.
- A tiny movement-only math trail is allowed at foot contact, capped to a few faint marks that disappear within a fraction of a second. A tiny unboxed `v = … u/s` readout may appear only while walking/running. Both must disappear at rest and must never become a persistent HUD, particle field, glow, or progress indicator.
- Keep the character visually secondary. The current baseline is deliberately smaller than the earlier Phase 2 figure; do not enlarge it casually or place it over primary reading areas.
- UI choreography should include anticipation, follow-through, rest, and recovery when visible enough to matter. Avoid obvious two-pose jumps.
- Theme switching no longer uses a thrown math object. The companion itself operates the shutter: dark closes top-to-bottom and leaves the figure briefly at the bottom; light opens bottom-to-top and leaves it briefly at the top.
- The theme shutter is a **background transition**. Site content remains above/readable during the wipe, and the effect must stay `pointer-events: none` so browsing continues normally.
- Scroll target updates continue while the companion is performing the shutter action; after the short edge rest it returns to the latest scroll position rather than an obsolete one. Keep the live stage Y separate from the normal track target Y so scroll/resize updates cannot teleport the figure mid-curtain. Prep, pull, edge hold, and rejoin must continue from the exact previous coordinate, with real leap/drop/landing motion instead of stage-transform snaps.


## Math companion Phase 3 — resident behavior, gait states, sound, and π portal

- Long inactivity now resolves into a quiet cross-legged seated idle pose after a shorter standing-rest phase. The pose is abstract/geometric, not a literal religious figure. Before locomotion or a visible interaction resumes, the companion must stand up through a real transition rather than snapping upright.
- Locomotion is speed-aware: idle → walk → brisk walk → run → sprint. Use hysteresis around thresholds so the gait cannot flicker rapidly between states. Faster states must change stride length, knee lift, arm swing, body lean, and cadence rather than merely speeding up the same walk cycle.
- Keep the existing velocity annotation and tiny math foot trail tied to actual movement. They remain ephemeral and disappear at rest.
- Theme audio is intentionally tiny and only becomes available after the user's theme-button gesture unlocks Web Audio. The shutter gets a low-volume fabric-like swish and edge/rejoin landings may get a soft tap. No sound UI, music, ambience, or autoplay.
- Internal route navigation may use a π portal. The portal always spawns from the companion's live current position and **pre-click facing direction**, never from a fixed page/nav coordinate and never by turning toward the clicked control first. The figure enters before the route commits, exits through the same local portal on the destination, then rejoins the new route's scroll target.
- The π portal is monochrome, typographic/geometric, short-lived, pointer-transparent, and belongs to the companion layer. It must not become a full-screen transition or block the site. External links do not use it.
- Theme choreography has higher priority than portal choreography; if the companion is already operating the shutter, navigation must continue immediately rather than interrupting the shutter with a portal.

## Math companion Phase 4 — dual theme choreography

- Theme toggle randomly selects one of two restrained effects: the existing companion-led curtain or a companion-powered radial light transition.
- Power mode must use the companion's exact live viewport position as the source. Dark → light expands a white circle from the figure; light → dark contracts the remaining white circle back into the figure before settling dark.
- Power mode uses only a restrained gray layered energy contour around the figure. Avoid literal flame tongues, yellow/color, glow filters, gradients, particle fields, large screen shake, or a long anime cutscene.
- The radial layer stays behind portfolio content and `pointer-events: none`. Browsing/scrolling must remain usable throughout the transition.
- Do not replace or degrade the existing curtain behavior. The two theme effects are alternatives, not a combined spectacle.

## Companion resident polish

- Preserve the current π portal design; it is intentionally 1.25× its previous size and entry motion moves slightly beyond its center.
- Persistent power has one strict condition: it may remain only after a dark → light transition that used the power effect. Theme effects are paired by the source of the current light state: power-created light must contract through power, while curtain-created/default light must return to dark through curtain. Power must never appear only to switch off a light state that was not powered in the first place. Any dark-mode result and reduced-motion/reset paths clear persistent power.
- The companion idle timer is global across public routes; do not let route/layout observer churn repeatedly restart it.
- Pointer dragging temporarily overrides motion. On release, use physical recovery and return to scroll pursuit; never snap/teleport the figure back.

## Math companion Phase 5 — jointed articulation

- The companion uses one persistent articulated body model across locomotion and authored actions: shoulder → elbow → wrist, hip → knee → ankle/foot, plus subtle spine bend and head counter-motion.
- Joints are internal control points only. Never expose joint dots, bone overlays, handles, or debug rig UI in production.
- Keep limb curves slight and geometric. The goal is to remove ruler-straight stiffness without turning the figure into rubber-hose/cartoon anatomy.
- Walk/brisk/run/sprint must drive all joint angles from the same distance-based gait phase. Faster movement changes stride, knee lift, elbow flex, torso lean, and head counter-motion; it must not simply speed up a single rigid walk loop.
- Existing seated idle, stand-up, drag/recovery, jump/landing, curtain, π portal, Mental Math reactions, and power-up states should reuse this skeleton rather than introduce one-off replacement drawings.
- Keep the rig dependency-free and deterministic unless a later phase explicitly justifies IK/physics.

## Math companion Phase 5 polish — gait + power continuity

- Running/sprinting use inward mirrored elbow flex, stronger forward torso drive, larger knee recovery, and controlled ankles so the character reads as running rather than sliding with a sideways arm.
- The power aura is a layered gray flame-energy field with asynchronous contour and rising-streak motion, never a static pasted outline. Persistent power uses a distinct braced idle stance; the dark→light radial field must visibly originate at the resident’s live body position.
- Power persistence is valid only after dark → light via the power transition; curtain light and every dark-mode outcome clear it.
- The radial theme change uses a transform-scaled white source centered on the companion for smoother frame-to-frame motion and clearer light-source causality.
- Portal entry depth is direction-relative and route commit happens only after the character has traveled past the π center.
