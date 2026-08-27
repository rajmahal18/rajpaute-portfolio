# Math Animation — Phase 4: dual theme choreography

Theme toggling now has two equally valid, randomly selected physical behaviors. The portfolio remains fully usable while either runs.

## Curtain mode

The existing character-led shutter is preserved unchanged: the companion reaches the appropriate edge, pulls the background shutter, rests briefly, and rejoins the latest scroll target.

## Power / light-source mode

The companion stays at its live viewport position and powers up in place.

- A restrained layered gray energy contour builds around the figure. Gray comes from monochrome opacity only; there is no colored anime glow or literal flame outline.
- Dark → light: a white circular field expands from the companion's torso until the viewport is light.
- Light → dark: the same white field contracts toward the companion, making the figure the final illuminated source before dark mode settles.
- The effect sits behind portfolio content and never captures pointer events.
- Scroll target updates continue while the companion is powering up; after recovery it resumes pursuit of the latest target.
- No new sound is attached to power mode. Existing curtain audio remains curtain-specific.

## Guardrails

- Theme effect selection is randomized per toggle, with a small anti-streak guard so one mode cannot dominate casual testing.
- No particles, yellow aura, gradients, glow filters, screen shake, or multi-second transformation cutscene.
- The power aura remains smaller than the companion's surrounding whitespace and visually subordinate to page content.
- `prefers-reduced-motion` keeps theme changes immediate and removes both animated theme effects.

## Phase 4.1 resident polish

- Keep the existing π portal design and route choreography. Its rendered geometry is intentionally `1.25×` the previous size, and portal entry carries the companion slightly beyond the π center before route commit so the head/body read as fully inside.
- Persistent power now survives only one case: dark → light through the power effect. That result leaves a calm layered gray aura and distinct powered stance. Curtain-sourced light, every dark-mode outcome, reduced-motion, and reset paths clear the powered state explicitly.
- The public-route idle clock is one shared resident state machine: relaxed idle starts after the same delay on every route, cross-legged idle follows at the same delay, and no-op layout/ResizeObserver updates must not restart that clock.
- The companion can be pointer-dragged while free. Dragging temporarily owns motion, lets the body trail the pointer slightly, then releases into a short capped inertia/floor-settle before normal scroll pursuit and idle behavior resume. Dragging must never teleport the resident back to its scroll target.
