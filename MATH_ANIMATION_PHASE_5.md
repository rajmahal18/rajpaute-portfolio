# Math Animation Phase 5 — Jointed Character Foundation

This phase upgrades the persistent math companion from a mostly rigid line figure into one consistent articulated body model. It is an animation-foundation pass, not a new feature pass.

## Body model

- One persistent skeleton is reused by locomotion and authored actions.
- Arms articulate as shoulder → elbow → wrist.
- Legs articulate as hip → knee → ankle/foot.
- The torso has a small independent spine bend and the head can counter-rotate against body motion.
- Joints are control points only. Do not render visible joint dots, bones, handles, or debug markers in production.
- Limbs use restrained curved SVG paths rather than ruler-straight segments. Keep the silhouette geometric and monochrome rather than rubber-hose/cartoon-like.

## Locomotion

- Existing distance-driven walk / brisk / run / sprint logic remains the source of locomotion timing.
- Shoulder, elbow, hip, knee, ankle, spine, and head motion update from the same gait phase so the body cannot look like independent parts sliding past one another.
- Faster gaits increase knee lift, elbow flex, stride, torso lean, and counter-motion rather than merely accelerating one walk loop.
- Feet still prioritize believable ground contact. Never trade planted-step readability for larger limb swings.

## Authored actions

- Existing idle/rest, seated idle, stand-up, drag/release, jump/landing, curtain, portal, Mental Math reactions, and power-up poses now reuse the articulated hierarchy.
- Transitions into and out of an action should preserve the same body proportions and joint origins. Avoid action-specific replacement drawings.
- Power-up may exaggerate joint angles slightly, but the persistent powered state remains restrained.
- Dragging may let distal joints trail the pointer direction, but release must recover through the same skeleton before normal locomotion resumes.

## Implementation guardrails

- Keep the system custom and dependency-free. Do not add an IK/physics/animation library unless a later phase proves it is necessary.
- Prefer deterministic keyframes and joint-angle functions over simulated ragdoll behavior.
- Preserve the companion's current secondary size, pointer behavior, portal/theme semantics, reduced-motion fallback, and black/white design language.


## Polish pass

- Corrected the run/sprint arm rig so left/right elbows bend inward with mirrored signs; this removes the sideways-arm silhouette seen in the first jointed pass.
- Rebalanced run/sprint drive with stronger torso lean, higher knee recovery, controlled ankle rotation, and less shoulder windmilling.
- Replaced the literal flame outline with three smooth gray energy contours and a quieter long-duration persistent aura.
- Added a distinct powered idle stance using the same articulated skeleton.
- Tightened power-state semantics: only dark → light via power can leave the persistent powered state; curtain light and all dark outcomes clear it.
- Replaced the stepped clip-path radial theme animation with a transform-scaled circular light source centered on the resident's live viewport coordinates.
- Corrected portal entry depth to follow facing direction and delayed route commit until the figure is visibly past the π center.


## Continuity polish — portal and paired theme source

- Portal X travel is now derived from the final clamped doorway center. If a requested facing direction is impossible at a viewport edge, the resident turns toward the visible π and still crosses its center before navigation commits. Route commit is tied to completed entry motion rather than an approximate timeout.
- Theme randomness now happens only on dark → light. The chosen light-source effect owns the inverse transition: curtain light returns through curtain; power light contracts through power. Initial/reloaded light defaults to curtain, preventing a surprise power-down animation.
- A power-to-dark sequence keeps the existing powered aura alive through contraction and clears it during recovery; power no longer materializes merely to disappear.
- The gray aura now uses asymmetric flame contours, rising dashed energy strokes, and a subtle core pulse with asynchronous timing. It stays monochrome and line-based but reads as living energy rather than a static outline.
- The radial light field starts at body scale at the resident’s live coordinates, with brief source rings, then expands to the viewport. The inverse collapses to the same point.
