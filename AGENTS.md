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
