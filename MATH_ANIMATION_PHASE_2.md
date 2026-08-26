# Math Animation — Phase 2

Phase 2 establishes the portfolio's interactive math stickman as a site-aware resident rather than a decorative Mental Math illustration. The current polish pass focuses on movement, theme choreography, scale, and visual restraint before adding more tricks.

## Core behavior

- `MathCompanion` mounts once at the app-shell level on public routes.
- The figure's horizontal position maps to current-page scroll progress: left means near the top of the route, right means near the bottom.
- There is **no visible progress/floor line**. The mapping remains an internal coordinate system so the companion does not become a second navigation element.
- Scroll updates a target rather than teleporting the figure. A damped catch-up loop lets it walk/run toward the target and settle.
- Walking cadence is distance-driven and now uses a planted-step gait: each stance foot moves backward against forward body travel before the swing leg recovers, with knee/foot counter-rotation to reduce the sliding-sprite effect.
- While actually walking/running, foot contacts can leave at most a few tiny short-lived math marks (`·`, `+`, `×`, `π`, `∠`, `−`). They are intentionally faint and disappear within roughly 0.4 seconds.
- A tiny unboxed `v = … u/s` readout appears only while the figure has meaningful horizontal speed, updates from the real motion velocity, and fades at rest.
- Pointer tracking remains subtle and only applies while the companion is idle.
- The figure is intentionally smaller than the first Phase 2 build so it stays a secondary detail in the portfolio's whitespace.

## Math vocabulary

The reusable spawn deck remains available for direct companion interactions and Mental Math reactions:

- `+`, `−`, `×`, `÷`, `=`, `√`, `π`, `e`, `i`
- circle, triangle, square, angle, vector

Objects remain short-lived and capped. Theme switching no longer uses a thrown math projectile.

## Theme interaction — physical shutter

The theme button now triggers a character-led shutter sequence instead of a shuriken/projectile hit.

### Dark mode

1. The companion leaves its scroll position and reaches the top edge.
2. It pulls the black shutter downward.
3. It travels with the shutter and rests briefly near the bottom edge.
4. It returns smoothly to the latest scroll-progress position.

### Light mode

1. The companion reaches the bottom edge.
2. It pulls the black shutter upward.
3. It travels with the shutter and rests briefly near the top edge.
4. It returns smoothly to the latest scroll-progress position.

The shutter is rendered **behind the site content**, not over it. During the wipe the foreground stays in its own layer and remains readable as the background changes. The choreography is pointer-transparent and never pauses scrolling, navigation, or button use. Scroll targets continue updating while the character is occupied so it can return to the correct place afterward.

The vertical motion system is continuous. `currentY` and the normal scroll-track target are separate: scrolling may update the target while a theme action is running, but it never rewrites the character's live Y coordinate. Reaching the top, pulling with the shutter, resting at an edge, and returning all start from the exact previous frame position. The curtain itself is slower than the first polish pass, and the companion uses explicit leap/drop/landing poses rather than stage-transform keyframes that can visibly jump between Y origins.

Reduced-motion users skip the choreography and receive the immediate theme switch.

## Other UI awareness

- Mental Math `Give me one`: `√` interaction + thinking response.
- Mental Math `Check`: `=` interaction / result response.
- Mental Math next-question action: brief attention response.
- Primary navigation and ordinary buttons may trigger small awareness cues without delaying their real behavior. Phase 3 adds one narrow exception: a claimed internal route waits only for the short π-entry beat before commit.
- Clicking/tapping the companion itself creates one local item from the reusable math vocabulary.

## Guardrails

- No speech bubbles, dialogue UI, gradients, color, permanent particles, or game HUD. The only sound exception is subtle user-initiated physical audio for the theme shutter/landing; no autoplay, ambience, music, or cartoon effects. The only trail exception is the tiny foot-contact math residue described above.
- No visible scroll track.
- No theme projectile/shuriken.
- Motion must be caused by actual user behavior or a meaningful state change.
- The character stays small and secondary to the portfolio content.
- UI reactions never block the underlying interaction. Phase 3 internal navigation may briefly defer route commit only while the companion enters π; all other controls remain immediate.
- Do not broaden the feature until the touched movement and theme behaviors feel intentional.

## Validation

Run before deployment:

```bash
npm ci
npm run validate:math
npm run lint
npm run build
npm run dev
```


Phase 3 behavior now extends this baseline with speed-based gait switching, a cross-legged long-idle state, subtle user-initiated curtain audio, and a position/facing-relative π route portal. See `MATH_ANIMATION_PHASE_3.md`.
