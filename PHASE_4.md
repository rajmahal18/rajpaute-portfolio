# Phase 4 — Personal Mental Math

## Identity direction

Mental math is now the portfolio's one distinctive interactive signature. It is not a separate game aesthetic and it does not change the black-and-white editorial brand.

The public experience is intentionally tiny:

- one problem at a time
- numeric/free-response only; no multiple choice
- the question is hidden until the visitor presses `Start`, so the timer and problem begin together
- the first submitted answer ends the attempt
- result shows correctness and solve time, followed by the correct answer and a concise mental route
- if Raj has a verified benchmark for that exact question, the result compares the visitor only with Raj
- `Try again` always serves a different question; the browser session cycles through the bank without repeats before reshuffling
- no streaks, XP, levels, confetti, leaderboard, percentile, or community stats
- visitor attempts are not persisted server-side

The bank contains 50 original medium/medium-plus mental-math problems inspired by the feel of MTAP-style competition math: number sense, percentages, ratios, age, work/rate, distance, algebra, patterns, and geometry.

## Public architecture

The question bank lives in `src/data/mentalMathQuestions.js`.

Public answer checking and timing happen in the browser. This is intentional: the experience is personal rather than competitive, so anti-cheat infrastructure would add complexity without value. The only server data exposed publicly is Raj's saved benchmark time per question.

`GET /api/math/benchmarks` returns the currently recorded Raj benchmarks. If the optional backend is unavailable, the mental-math interaction still works; it simply cannot show a Raj comparison.

## Owner benchmark mode

The private benchmark route is deliberately not linked from the site. Default route:

`/lab/mm-rp-314159`

It can be changed at build time with:

`VITE_OWNER_MATH_ROUTE=/your/private/path`

The route is only obscurity. It is **not** treated as the security boundary.

Actual owner protection uses Cloudflare Pages Functions with:

- username/password stored only as Cloudflare environment secrets
- HMAC-signed session token
- `HttpOnly`
- `SameSite=Strict`
- `Secure` on HTTPS
- eight-hour session lifetime

Required environment variables/secrets:

- `MATH_OWNER_USERNAME`
- `MATH_OWNER_PASSWORD`
- `MATH_SESSION_SECRET` — use a long random value

The owner page prioritizes questions without a benchmark. Raj presses `Start benchmark`, answers the hidden-until-start question, and may explicitly `Save benchmark` only after a correct attempt. Saving replaces the official benchmark for that question.

## D1

Create/bind a Cloudflare D1 database to the Pages project using the binding name:

`DB`

Apply:

`migrations/0001_mental_math.sql`

Example Wrangler command after creating the database:

```bash
npx wrangler d1 execute <database-name> --remote --file=./migrations/0001_mental_math.sql
```

The database stores **only Raj's benchmark rows**. It does not store visitor attempts or visitor identities.

## Free-tier behavior

The portfolio remains a mostly-static Vite app. A normal visitor generates at most one tiny benchmark read on page load; solving questions does not generate database writes. Only authenticated owner benchmark saves write to D1.

## Local development

`npm run dev` is enough to test the public question UI. Because ordinary Vite dev does not run Cloudflare Pages Functions, Raj comparisons and owner login require a Pages Functions environment (deployed preview or a Wrangler Pages development setup).
