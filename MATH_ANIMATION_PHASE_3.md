# Math Animation — Phase 3

Phase 3 keeps the companion small and secondary while making its behavior read more like one continuous resident of the portfolio.

## Idle hierarchy

- Immediate rest: standing idle.
- After ~3.6 seconds without meaningful movement: relaxed standing rest.
- After ~8.2 seconds: cross-legged seated idle with only a tiny breathing motion.
- Pointer awareness can remain subtle while seated.
- Any movement/action first uses a short stand-up transition; no upright snap.

## Speed-aware locomotion

The horizontal spring still follows page scroll progress, but the gait now switches by actual velocity/progress gap with hysteresis:

- walk
- brisk walk
- run
- sprint

Each state changes stride geometry, knee lift, arm swing, bob, lean, and cycle distance. The existing `v = … u/s` annotation remains driven by real spring velocity. Foot-contact math marks remain capped and short-lived.

## Theme sound

No audio file is added to `public/`. A tiny Web Audio cue is synthesized only after the theme-button gesture unlocks audio:

- curtain pull: low-volume filtered-noise swish
- edge/rejoin landing: very soft short tap

The sound is optional enhancement only; theme switching remains fully usable without it.

## π route portal

Internal route navigation dispatches a cancelable route-intent event. When the public companion is free, it claims that intent and performs a short local portal sequence:

1. π spawns slightly in front of the figure according to its exact live position and pre-click facing direction; navigation clicks do not rotate the figure first.
2. If the figure was seated, it stands first while π opens.
3. The figure moves into π and fades only as it crosses the doorway.
4. The route commits while the figure is inside.
5. The same local π remains long enough for the figure to emerge on the destination.
6. π closes, then the figure catches up to the new page's current scroll target.

The portal is not tied to header links, project cards, or a fixed screen coordinate. Back navigation uses the same route-intent path when possible. If theme choreography is already running, navigation proceeds immediately rather than interrupting the shutter.

## Guardrails

- No visible progress/floor line.
- No theme projectile.
- No full-screen portal or page-blocking transition.
- No portal for external links.
- No permanent HUD, particles, soundscape, or character dialogue.
- `prefers-reduced-motion` keeps route/theme behavior immediate and removes animated portal/trail behavior.
