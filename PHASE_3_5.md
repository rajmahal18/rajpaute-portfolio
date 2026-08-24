# Phase 3.5 — Mobile scale, consistency, and current-growth polish

## Goals

- Finish the mobile typography pass without changing the Phase 3 visual direction.
- Keep the work index compact and clearly subordinate to hero/page headings.
- Tighten visible label consistency across About and project detail pages.
- Reflect current learning in automation and practical AI without turning the portfolio into an AI-themed site.
- Add n8n to the tech stack and surface its genuine use in Cotabato Pickleball availability automation.
- Make browser Back/Forward scroll restoration a little more resilient.

## Changes

- Mobile Selected work titles now use a smaller 18–22 px responsive range; archive titles are smaller again.
- Project row icon, index, spacing, and minimum height were reduced on mobile to match the new type scale.
- About now includes a low-key `Currently learning` block describing ongoing automation/n8n study and practical AI exploration for career growth.
- About uses `Tech stack`, and project facts now use the same label.
- n8n appears as its own Automation stack row.
- Cotabato Pickleball now documents its n8n-based booking-sheet availability synchronization without claiming that every venue is automated.
- Scroll restoration retries up to 1.2 seconds and saves on `pagehide` as well as normal unload/navigation paths.
