# Phase 4.6 — Math Typesetting + GitHub Activity

This pass closes two visual/content gaps without changing the portfolio's identity.

## Mental math typesetting

Mental-math prompts and solutions now use the shared `MathText` renderer.

Supported presentation details include:

- stacked inline fractions
- consistent superscripts
- existing multiplication, minus, degree, ratio, currency, and unit notation
- the same rendering in the public homepage challenge and the private benchmark lab

The question bank uses a small explicit fraction markup such as `{{frac|1|x}}`. This keeps the bank dependency-free and avoids shipping a full equation-rendering library for the limited notation used by the 50 questions.

Do not expose this markup directly in UI. Always render prompt/solution text through `MathText` wherever rich question content is displayed.

## GitHub activity

The About page includes a live contribution calendar that intentionally follows the familiar GitHub contribution-grid structure while remaining portfolio-native:

- black/white/grayscale only
- month labels
- Mon/Wed/Fri row labels
- contribution intensity from `Less` to `More`
- contribution count for the last year
- pointer/touch tooltip for an individual day
- local horizontal scrolling on narrow screens only; never page-level overflow

Data comes from GitHub GraphQL through `/api/github/contributions`. The GitHub token stays server-side in Cloudflare environment secrets.

Required Cloudflare secret:

```text
GITHUB_TOKEN=<github personal access token>
```

Optional override:

```text
GITHUB_USERNAME=rajmahal18
```

The endpoint is cached for six hours at the shared-cache layer and may serve stale data while refreshing. The About page degrades to a quiet unavailable state if the API or token is unavailable.

## Local development

Normal Vite development still runs the portfolio UI:

```bash
npm run dev
```

The live GitHub graph requires the Cloudflare Pages Functions runtime, just like the mental-math owner backend. Put `GITHUB_TOKEN` in an uncommitted `.dev.vars` file and run the project through Wrangler when testing the real contribution feed.
