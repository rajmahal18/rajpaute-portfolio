# Phase 3 — Scale, whitespace, and de-template pass

## Goals

- Make the interface materially smaller rather than merely adding whitespace around oversized elements.
- Center the desktop experience in a narrow column occupying roughly half of the viewport.
- Replace homepage project imagery with a quiet icon-led work index.
- Reduce arrow-up-right repetition and reserve it for external destinations.
- Make navigation and project lists more icon-centric while preserving labels and accessibility.
- Remove the BIR concept project entirely.
- Preserve first-class mobile behavior and prevent page-level horizontal overflow.

## Key implementation changes

- Desktop shell: `min(available width, clamp(720px, 54vw, 900px))`.
- Hero/display typography reduced substantially from Phase 2.
- Homepage and Work listings no longer render project screenshots.
- Project entries use consistent monochrome glyphs, title, index, status (where relevant), and a normal right-arrow for internal navigation.
- External arrow-up-right remains only for live/outbound resources.
- Header navigation now pairs restrained monochrome icons with consistent labels.
- Footer is icon-led rather than repeating text + external-arrow patterns.
- BIR project data and its unused `bir1.svg` asset were removed.
