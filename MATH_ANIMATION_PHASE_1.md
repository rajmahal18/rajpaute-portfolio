# Math Animation — Phase 1

This pass adds a small living math presence to the existing Mental Math section without turning the portfolio into an animation showcase.

## What changed

- Added a custom dependency-free SVG stick figure that lives beside Mental Math on wide screens and folds into the section on smaller screens.
- The scene assembles itself once when it enters view: baseline, radical, geometry, figure, and math objects draw/drop in with restrained timing.
- Pointer movement creates local awareness only inside the scene: the head, body lean, and nearby/far math objects react with small parallax offsets.
- Clicking/tapping the scene triggers a short `3 × 4 = 12` construction. The figure and `+` token participate in the motion rather than showing a disconnected effect.
- Mental Math state also feeds the scene:
  - active question → quiet thinking motion
  - correct result → brief impressed/arms-up response
  - wrong result → small reset response
  - interrupted attempt → subdued posture
- Added a static reduced-motion presentation for visitors who request less motion.

## Guardrails

- Pure black and white only.
- No speech bubbles, chat UI, sound, particles, gradients, confetti, or game HUD.
- No animation library was added. The implementation uses React, SVG, CSS, IntersectionObserver, and pointer input already available in the browser.
- The cursor-responsive behavior is intentionally scoped to the Mental Math sketch. It is not a site-wide cursor effect.
- The scene should stay subordinate to the actual question and portfolio content.

## Validation

Run:

```bash
npm run validate:math
npm run lint
npm run build
```
