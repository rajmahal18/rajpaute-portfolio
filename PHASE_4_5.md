# Phase 4.5 — Portfolio Loose Ends

Phase 4.5 is a polish pass, not a redesign. It preserves the narrow centered black-and-white system and closes the remaining UX/content gaps before the mental-math backend setup continues.

## Mental math

- All 50 questions now include a concise mental solution.
- Every submitted attempt reveals:
  - correctness and visitor time
  - Raj benchmark when available
  - `Answer`
  - `Mental route`
- The first submitted answer still ends the timed attempt.
- A session-shuffled deck prevents repeated questions until all 50 have been seen. After exhaustion, the deck reshuffles while avoiding an immediate repeat of the previous question.
- Question/result state is stored only in browser session storage. Visitor attempt data is still not written to the backend.
- If the visitor leaves or reloads during an active timed attempt, that timing is invalidated. Returning shows the same interrupted problem and offers `Try again`, which starts a different question.

## Contact

The raw email address is no longer used as giant display typography.

Home:
- `Contact`
- `Have something worth building?`
- `Send me a message`

Contact page:
- same restrained invitation
- mailto action
- location
- social profile rows
- resume

The actual address remains available through the mailto target and icon-only footer email action.

## Case-study labels

Every project case study uses the same facts vocabulary:

- `Type`
- `Role`
- `Status`
- `Tech stack`

This also makes the project type visible immediately after opening a catchy project title, without adding explanatory subtitles to homepage/work listings.

## Metadata

Route meta updates now keep document title, description, Open Graph title/description, and Twitter title/description aligned with the current page. Theme color already follows light/dark mode.

## Validation

Run:

```bash
npm run validate:math
npm run lint
npm run build
```

`validate:math` now checks all 50 unique IDs, numeric answers, and non-empty solutions.
