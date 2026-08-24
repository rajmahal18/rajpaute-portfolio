# Phase 4.7 — Voice Layer + Math Alignment

This patch makes the portfolio feel authored by Raj rather than narrated by a neutral portfolio template, without adding a chatbot or visual gimmick.

## Conversation layer

- Home now adds small first-person context around Selected work and Contact.
- Mental Math speaks in Raj's voice before and after an attempt (`Think you can beat me?`, `Okay, you got me`, `I had this one`, `Another one`).
- Work gets one short first-person orientation line instead of additional UI.
- About adds an inline `Quick questions` interaction with four prewritten answers. It is page content, not a modal or chatbot.
- GitHub activity gets a single authored context line.
- Project pages end with a quiet thank-you line for visitors who read the full build.
- Contact is framed as a real invitation rather than generic sales copy.

The goal is presence, not chatter. Keep authored lines short and sparse.

## Math alignment

- Stacked fractions remain dependency-free through `MathText`.
- Fraction boxes now align with the surrounding equation baseline instead of visually dropping below the line.
- The `x + 1/x` algebra question also uses explicit grouping parentheses for clarity.
- Public Mental Math and the private benchmark lab continue to share the same renderer.
