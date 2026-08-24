# Black & White Portfolio Design System

## Brand

The portfolio is a quiet monochrome frame for the work: restrained, editorial, technical, and deliberately sparse. Individual projects provide the subject matter. The shell must not inherit a visual theme from any one project (including pickleball or sports motifs).

Project imagery is intentionally absent from the homepage/work indexes. Screenshots appear inside project case-study pages and remain grayscale so the portfolio keeps one identity.

## Color tokens

Light mode:
- paper: white
- ink: near-black
- hierarchy: black at reduced opacity

Dark mode:
- paper: black
- ink: white
- hierarchy: white at reduced opacity

No semantic colors. No colored status badges. No gradients. Dark mode is the same design with foreground/background roles reversed.

## Typography

- Display: Source Serif 4 with Georgia fallback
- Body/UI: Inter with Helvetica/Arial fallback
- Display type is editorial but restrained; avoid oversized fashion-magazine scale
- Small uppercase tracked labels are reserved for repeated metadata vocabulary
- Body copy stays narrow and relatively small so whitespace does the visual work

## Scale & spacing

- The interface should feel visually zoomed out, never oversized
- Desktop content is deliberately constrained to roughly half of the viewport, centered with large dead space on both sides; the shell tops out around 900 px
- Large whitespace is intentional; do not fill it with badges, metrics, decoration, or filler copy
- Fewer elements per viewport is preferred
- Mobile uses its own spacing and hierarchy rather than shrinking desktop values
- Mobile work-index titles stay deliberately compact; they should read as navigation entries, not mini hero headings

## Work presentation

- Homepage shows exactly four `Selected work` entries in the required order
- Selected work is presented as a narrow, icon-led, image-free editorial index, not a SaaS card grid
- The whole project entry is clickable
- Listing titles are the project names only; explanatory copy belongs inside the case-study route
- `Tech stack` is the consistent visible label for technology summaries
- `/work` reuses the selected-work presentation, then shows `More work` as a compact text-first archive list

## Geometry

- Square/straight-edged surfaces by default
- Thin monochrome rules and borders
- No nested decorative cards
- Case-study images use restrained editorial framing
- Project screenshots are grayscale and never color-revealed on hover
- Arrow-up-right is reserved for genuinely external destinations; internal navigation uses normal directional arrows or no arrow

## Motion

- Motion is limited to tiny arrow movement and nearly imperceptible image scale changes
- No scroll-triggered entrances, parallax, cursor effects, 3D tilts, or perpetual animation
- Respect `prefers-reduced-motion`

## Navigation

The site uses route-style URLs through the History API without modal navigation. Internal links preserve browser history. Scroll position is stored per history entry in session storage so Back/Forward returns users to the previous reading position.

Routes:
- `/`
- `/work`
- `/work/:slug`
- `/work/:slug/screens/:index`
- `/about`
- `/contact`

On mobile, the sticky header uses two intentional rows: brand/theme first, then three evenly distributed primary navigation links. This avoids compressed desktop navigation and keeps tap targets usable without horizontal scrolling.

`public/_redirects` provides SPA fallback for Cloudflare Pages-compatible hosting.

## Mental math

Mental math is an identity detail, not a theme change.

- It appears on the homepage between the hero and `Selected work`.
- Use the same narrow centered shell, typefaces, rules, icon weight, spacing system, and monochrome inversion as the rest of the site.
- The idle state should feel almost like editorial copy: `Mental math`, a short line, and `Start`.
- Hide the actual problem until timing starts.
- Questions may be longer word problems; always wrap naturally and never widen the shell or create horizontal scrolling to accommodate them.
- Result language stays quiet and personal: solve time, `Raj · ...`, and a short comparison sentence. After the timed result, show `Answer` and a compact `Mental route` explanation inline.
- Use a shuffled session deck so the same problem does not repeat until the bank has been exhausted. If a timed attempt is interrupted by navigation/reload, discard that timing rather than resuming it.
- No scoreboard surfaces, colored correct/incorrect states, progress bars, trophy icons, game cards, gradients, or celebratory effects.


## Contact treatment

- Never use the raw email address as a giant display headline.
- Home ends with a sparse `Contact` section: `Have something worth building?` + `Send me a message`.
- `/contact` repeats that invitation and uses quiet icon-led rows for location, social profiles, and resume.
- The actual email stays inside the mailto target and footer email icon, keeping the public composition cleaner without making contact harder.

## Equation treatment

Mental-math equations use the same editorial typography as the rest of the site, with proper inline fraction bars and superscripts. Fractions should read as mathematical notation rather than raw programming-style slash strings when the expression is algebraic. Unit notation such as `km/h` remains inline text. The rendering must remain compact enough for mobile and must never widen the page shell.

## GitHub activity

GitHub activity belongs on About as evidence of ongoing work, not as a homepage vanity metric. Preserve the recognizable contribution-calendar grammar while translating it into the portfolio system:

- thin square cells
- black/white intensity only
- month and weekday labels
- quiet last-year contribution count
- simple `Less` → `More` legend
- a restrained day tooltip
- one external `View GitHub` action

Do not add green, badges, streaks, language charts, follower counts, repository-stat cards, or other GitHub-dashboard clutter. On narrow screens the graph scrolls inside its own frame; the overall page must remain horizontally fixed.

## Authored voice

The site should feel like Raj is present without pretending to be a live chat experience. Use one short first-person line when context benefits from it, then let the work breathe. The tone is direct, lightly conversational, and specific. Avoid marketing slogans, faux intimacy, excessive jokes, speech bubbles, and chatbot patterns.

About includes a restrained `Quick questions` section: simple text rows, one inline answer at a time, no modal, no card grid, no fake assistant.

Mental Math is the most conversational surface. Before an attempt it can challenge the visitor; after an attempt it can react in Raj's voice. Results remain factual and typography-first.

## Inline fraction alignment

Stacked fractions must sit visually inside the same equation line. Keep them compact, raise them slightly relative to the text baseline, and avoid negative vertical offsets. The fraction bar and numerator/denominator should not force the surrounding equation to look like multiple separate lines.
