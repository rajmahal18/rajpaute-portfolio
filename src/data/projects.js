export const projects = [
  {
    id: 15,
    portfolioGroups: ["rverse"],
    projectPriority: 6,
    featured: false,
    status: "LIVE",
    title: "RVerse Blueprint",
    workType: "Developer Tool / Product Specification Workspace",
    role: "Product designer and systems developer",
    currentStatus: "Live",
    problemSolved:
      "Turns loose product ideas into an explicit, reviewable implementation contract so scope, workflows, visual direction, and build expectations are decided before coding starts.",
    stackSummary: "React, TypeScript, Vite, IndexedDB, local-first persistence",
    tags: ["React", "TypeScript", "Vite", "IndexedDB", "Product Design", "Developer Tooling"],
    description:
      "Local-first application specification and visual direction workspace that converts product intent into guided setup decisions, core flows, implementation sequencing, visual contracts, previews, and prompt-ready build handoffs without silently inventing product scope.",
    link: "https://rverse-blueprint.pages.dev",
    screenshot: "/rverse-blueprint.svg",
    screenshots: ["/rverse-blueprint.svg"],

    realWorld: {
      usedIn: "Planning and handing off web application builds before implementation",
      usedBy: "A developer defining product scope, UX behavior, visual direction, and implementation constraints",
      usageContext:
        "Built from a recurring problem in AI-assisted development: a short prompt can produce working software quickly, but vague scope, implicit assumptions, generic frontend choices, and inconsistent handoffs become expensive once the build grows. Blueprint moves those decisions into a reusable planning workspace before implementation begins.",
    },

    caseStudy: {
      problem:
        "AI-assisted builds can move from idea to code faster than the product decisions behind them. Optional features get inferred as requirements, long prompts become difficult to review, visual direction collapses into familiar templates, and implementation details drift across iterations. I needed a repeatable way to make the intended product explicit without turning planning into a giant form that has to be completed manually every time.",
      constraints: [
        "A new workspace must already be usable without answering hundreds of setup questions",
        "Suggested functionality must never become implementation scope without an explicit user decision",
        "Advanced configuration has to remain available without overwhelming the default workflow",
        "Visual guidance must help prevent generic AI-generated interfaces without inventing functional requirements",
        "Long specifications need to remain reviewable and exportable as stable implementation handoffs",
        "Workspace data and uploaded reference assets should persist locally without requiring a backend account",
      ],
      solution:
        "I built Blueprint as a guided, local-first specification workspace. The user describes what is being built, resolves only the decisions that actually matter, defines core flows, shapes the visual direction, previews representative pages and interaction states, explicitly approves a Visual Contract, then exports an implementation-oriented Blueprint. The system keeps product scope, workflow intent, visual authority, recommendations, and implementation judgment as separate layers so one cannot silently override another.",
      highlights: [
        "Guided-first workflow that surfaces unresolved goal-critical decisions instead of exposing the full settings catalog by default",
        "940 schema-driven product and engineering decisions across 52 possible sections with progressive disclosure",
        "Explicit scope authority: Suggested is never silently converted to On",
        "Project Context intent detection that flags missing booking, inventory, clinic, document workflow, tournament, directory, reporting, subscription, and other relevant setup decisions",
        "User-authored Core Flows plus a derived implementation roadmap that sequences work without creating new scope",
        "Visual DNA, Visual Director, Pattern Explorer, Page Composition Intelligence, and Preview Studio for deliberate frontend direction",
        "Explicit visual approval that freezes a stable Visual Contract and detects when later edits make that approval stale",
        "Anti-homogeneity checks and frontend quality constraints designed to reduce generic AI-generated visual patterns",
        "Persistent TL;DR mode and contextual info explainers for dense or unfamiliar concepts",
        "Find Anything command palette with typo-tolerant search and direct jumps to hidden settings",
        "Prompt-ready implementation contract and full Blueprint reference exports",
      ],
      technicalImplementation: [
        "Built the application in React and TypeScript with a schema-driven configuration model so hundreds of decisions can share consistent state, defaults, search metadata, review behavior, and compiler output.",
        "Separated explicit App Setup scope from derived recommendation, Project Context, Core Flow, visual, and roadmap layers to prevent lower-authority signals from accidentally activating functionality.",
        "Implemented typed review signals and guided readiness logic so the same unresolved-decision definition powers Home, Setup, badges, banners, Finder, exports, and the final build-readiness gate.",
        "Used IndexedDB for local-first workspace persistence and reference assets, including current/recovery workspace envelopes and backup/import flows without requiring a server-side user account.",
        "Built deterministic compiler/export functions that turn structured configuration into implementation prompts, scope contracts, roadmap guidance, acceptance criteria, edge cases, and supporting project documentation.",
        "Added regression suites across the configuration engine, persistence, review intelligence, scope compiler, flows, roadmap, visual intelligence, approval contract, guided UX, and visual guidance layers.",
      ],
      challengesAndDecisions: [
        "The biggest design problem was not adding more settings; it was keeping a very large configuration system usable. The default experience therefore became Describe → Resolve → Tune if needed, with the full catalog treated as an escape hatch rather than the main workflow.",
        "Recommendations needed a hard authority boundary. Blueprint can identify a capability the stated goal appears to need, but the system only surfaces the mismatch and waits for an explicit Include / Not needed decision instead of silently enabling it.",
        "Visual intelligence had to stay powerful without becoming functional scope authority, so page proposals, previews, design references, and approved visual contracts are explicitly presentation-only.",
        "A visual approval is only useful if it stays trustworthy. Material changes to the underlying visual direction therefore mark the saved contract stale until the user reviews and approves it again.",
        "Dense planning tools easily become documentation walls, so v0.33 added reusable TL;DR presentation and contextual concept explainers while deliberately preserving blockers, warnings, status, and primary actions.",
      ],
      metrics: [
        "940 schema-driven product and engineering decisions",
        "52 possible setup sections under progressive disclosure",
        "229 named regression checks at the v0.33 milestone",
        "One local-first workspace spanning product scope, workflows, visual direction, preview, approval, and implementation handoff",
      ],
      outcome:
        "Blueprint turns my app-building process into a reusable product instead of a sequence of increasingly long prompts. It gives me a stable place to decide what the software should do, what it should not assume, how it should feel, what must be proven before completion, and exactly what the implementation AI should receive. The result is less prompt drift, less accidental scope, and a much stronger starting point for building distinct applications quickly.",
      whatIdImproveNext: [
        "Continue expanding high-confidence intent detection for additional application domains without weakening explicit scope authority",
        "Add more visual reference and composition intelligence while keeping the approved Visual Contract compact and implementation-ready",
        "Keep reducing repetitive configuration work through safe recommendations, presets, and reusable product patterns",
        "Deepen validation around generated handoffs as the Blueprint compiler grows",
      ],
      links: {
        live: "https://rverse-blueprint.pages.dev",
        repo: "#",
      },
    },
  },

  {
    id: 16,
    portfolioGroups: ["rverse"],
    projectPriority: 6,
    featured: false,
    status: "LIVE",
    title: "RVerse Booking",
    workType: "Booking / Scheduling Product Demo",
    role: "Product designer and full-stack developer",
    currentStatus: "Live",
    problemSolved:
      "Gives court owners a hands-on way to understand an online booking system by letting them try both the player journey and the staff workflow instead of relying on a static sales pitch.",
    stackSummary: "React, TypeScript, Vite, Motion, React Router, Vercel",
    tags: ["React", "TypeScript", "Vite", "Motion", "React Router", "Product Design", "Booking UX", "Vercel"],
    description:
      "Mobile-first sales site and interactive fictional court demo for RVerse booking systems. PickleRVerse lets prospects experience court discovery, live availability, booking, booking management, payment review, staff scheduling, and venue configuration from both sides of the same simulated operation.",
    link: "https://rverse-booking.vercel.app",
    screenshot: "/rverse-booking-venue.webp",
    screenshots: ["/rverse-booking-venue.webp", "/rverse-booking-aerial.webp"],
    heroCaption:
      "The fictional PickleRVerse venue is the design source for the demo, so the booking interface feels native to the court instead of layered on top of it.",
    proofLine: "Player + staff demo · shared booking state · mobile-first flow · venue-derived visual system",
    screenshotCaptions: [
      "Front venue view establishes the fictional court identity used throughout the booking experience.",
      "Aerial view makes the three-court layout legible and gives the demo a consistent physical world to reference.",
    ],

    realWorld: {
      usedIn: "Demonstrating and selling customizable booking systems to sports facilities",
      usedBy: "Prospective court owners, facility staff, and players evaluating the booking experience",
      usageContext:
        "Built as a prospect-facing product demo rather than a generic mockup. A court owner can enter the fictional PickleRVerse venue, make a sample booking as a player, switch to Court Staff, and see the same booking and schedule state from the operational side.",
    },

    caseStudy: {
      problem:
        "Explaining a booking system through screenshots, feature lists, or a long proposal makes the product harder to evaluate than it needs to be. Prospective court owners need to see what their customers would experience, what their staff would control, and how the system could feel like part of their own venue brand without first committing to a full implementation.",
      constraints: [
        "The public booking flow must be immediately understandable on a phone for non-technical users",
        "The demo must show both customer and staff workflows without pretending to be a production backend",
        "Changes made in one demo view should appear coherently in the other view within the same browser",
        "The fictional venue should feel like a real place with a distinct identity rather than a generic SaaS template",
        "High-motion presentation must never make the core booking actions harder to find or use",
        "The sales site needs to explain pricing, capabilities, and customization without overwhelming a prospect",
      ],
      solution:
        "I built RVerse Booking as a combined sales experience and interactive product simulation. The public side uses the fictional PickleRVerse court as a complete branded venue, while the booking and Court Staff views share the same seeded browser state. Prospects can move from venue discovery to a sample booking, manage that booking, switch roles, review payment proofs, add walk-ins, block schedules, and change public-facing venue settings without leaving the demo.",
      highlights: [
        "Mobile-first PickleRVerse venue with court details, live availability, amenities, location information, house rules, and clear booking entry points",
        "Compact multi-court schedule with obvious availability states and a four-step booking flow with a persistent booking summary",
        "Booking lookup and management flow for reviewing or updating a sample reservation",
        "Court Staff workspace for schedule review, manual bookings, blocked slots, rescheduling, cancellation, and payment-proof verification",
        "Shared demo state so player bookings and staff-side changes stay synchronized in the same browser",
        "Configurable court names, rates, venue identity, operating details, amenities, rules, parking information, and manual payment instructions",
        "Guided role switching so prospects can understand the relationship between the player and operations sides without needing a walkthrough",
        "Environment-derived visual system using the fictional court's blue, lime, navy, concrete, sky, and foliage tones instead of a detached software palette",
        "Continuous pickleball motion language including rally animation, kinetic court typography, route-loading ball motion, and an animated PickleRVerse mark while respecting reduced-motion preferences",
      ],
      technicalImplementation: [
        "Built with React 19 and TypeScript on Vite, using React Router for the sales, venue, booking, booking-management, and Court Staff routes.",
        "Used Motion for coordinated page, logo, rally, hover, and scroll animation while keeping operational screens comparatively restrained.",
        "Modeled the interactive demo around seeded local state persisted in localStorage so player and staff views can share bookings, blocks, settings, and payment status without requiring a backend account.",
        "Kept the booking schedule and staff schedule on the same status language so availability, reserved hours, blocked hours, manual bookings, and completed selections remain easy to compare.",
        "Added SPA fallback configuration for Vercel and Cloudflare Pages so deep demo routes remain directly accessible.",
      ],
      metrics: [
        "5 primary live routes across sales, player, booking, booking management, and Court Staff",
        "3 fictional courts sharing one schedule model",
        "2 synchronized perspectives: player and court staff",
        "1 browser-local demo state that can be reset to a known seed",
      ],
      challengesAndDecisions: [
        "The demo needed enough operational depth to prove the product without implying that localStorage was the intended production architecture, so the interface is explicit about being a simulation while the workflow mirrors a real deployment.",
        "A highly animated venue can easily become harder to use on mobile. I kept the presentation layer expressive but made the booking path, schedule states, sticky summary, and Court Staff controls visually disciplined.",
        "The fictional venue became the design source rather than a decorative image. Its court surface, apron, fencing, lighting, and brand mark drive the UI palette and motion language so the software feels native to the place it represents.",
        "The sales site separates the sample workflow from client branding expectations, making it clear that a real deployment can use the court owner's own name, logo, colors, rates, rules, and payment setup.",
      ],
      outcome:
        "RVerse Booking is now a live, self-explanatory sales asset that lets a prospect experience the product instead of only reading about it. It demonstrates the customer journey, day-to-day staff controls, brand customization potential, and the mobile-first visual quality I want future court deployments to inherit.",
      whatIdImproveNext: [
        "Add a guided brand preview where a prospect can enter a court name and logo and immediately see the fictional venue theme adapt",
        "Expand the demo with additional real-world scheduling edge cases while keeping the first-time experience simple",
        "Connect client deployments to production-grade authentication, database persistence, and payment integrations based on the agreed operating model",
        "Continue refining motion and responsive behavior without increasing cognitive load in the booking flow",
      ],
      links: {
        live: "https://rverse-booking.vercel.app",
        repo: "#",
      },
    },
  },

  {
    id: 14,
    portfolioGroups: ["client"],
    projectPriority: 6,
    featured: true,
    featuredOrder: 0,
    status: "IN_USE",
    title: "MPW Dink & Dash 2026",
    workType: "Production Event Platform",
    role: "System architect and full-stack developer",
    currentStatus: "Production event system",
    problemSolved:
      "Replaces fragmented tournament setup, court operations, scoring, qualification, lineups, voting, and recovery workflows with one configurable live-event platform.",
    stackSummary: "Next.js, React, TypeScript, Prisma, PostgreSQL, Neon, Tailwind CSS",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Neon",
      "Node.js",
      "DigitalOcean",
      "Nginx",
    ],
    description:
      "Production tournament operations and public live-event platform for MPW Dink & Dash 2026, built around a configurable multi-division engine, concurrency-safe scoring, dynamic brackets, team workflows, fan engagement, analytics, and event recovery.",
    link: "https://mpwdinkanddash.cotabatopickleball.com",
    screenshot: "/mpw-dnd.png",
    screenshots: ["/mpw-dnd.png"],
    heroCaption:
      "Production tournament platform for a live MPW event, combining organizer operations, scoring, qualification, team workflows, public results, and recovery controls.",
    proofLine: "Live event operations · concurrency-safe scoring · public results · recovery tooling",
    realWorld: {
      usedIn: "MPW Dink & Dash 2026 pickleball tournament",
      usedBy: "Tournament organizers, scoring operators, team managers, players, and public spectators",
      usageContext:
        "Built for a live Ministry of Public Works – BARMM event where administrative setup, court activity, team submissions, public results, and recovery controls must stay coordinated under real tournament pressure.",
    },
    caseStudy: {
      problem:
        "A live multi-event tournament cannot be operated reliably through disconnected brackets, spreadsheets, lineup messages, score sheets, and public updates. Organizers needed one system that could adapt to different divisions and entrant models while keeping live scoring, standings, qualification, court queues, team-manager actions, fan voting, and public coverage consistent.",
      constraints: [
        "Support team-based and pair-based divisions without forcing every event into one fixed format",
        "Protect completed tournament history while allowing safe changes to future fixtures and configuration",
        "Prevent stale scoring clients from silently overwriting newer live results",
        "Keep team-manager lineup permissions synchronized with the live court queue and matchup state",
        "Provide near-real-time public updates without requiring WebSocket infrastructure",
        "Give operators recovery and simulation tools with stricter safeguards in production",
      ],
      solution:
        "I re-engineered the application into a configurable tournament operations platform. Divisions define their own competition format, entrant type, stages, lineup rules, qualification sources, and bracket tracks. The same domain layer coordinates scoring, standings, matchup progression, court queues, public updates, recognition systems, and history-safe administrative operations.",
      highlights: [
        "Configurable multi-division engine for group knockout, round robin, single elimination, and custom formats",
        "Dynamic 2, 4, 8, and 16-qualifier brackets with persisted qualification sources and wildcard tracks",
        "Concurrency-safe live scoring using version checks and PostgreSQL serializable transactions",
        "Server-enforced court queue and sequential team-manager lineup workflow",
        "Fan Favorite voting, MVP analytics, and privacy-conscious first-party visitor analytics",
        "Audit logs, history protection, simulation guardrails, checkpoints, granular undo, and reset controls",
      ],
      technicalImplementation: [
        "Built the full-stack application with Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma, and PostgreSQL on Neon.",
        "Modeled multiple competition formats, entrant types, stages, bracket tracks, matchup-specific lineups, eligibility records, score events, audit events, voting, analytics, and operational recovery across 23 Prisma models.",
        "Implemented standings and qualification rules around pair-match wins, net point differential, total points, conditional head-to-head resolution, conservative clinching analysis, and manual resolution for genuinely terminal ties.",
        "Added stage-aware score validation and knockout majority-clinch behavior, including early series completion while retaining all required group-stage games for standings metrics.",
        "Separated high-frequency rally events from structural recalculation and administrative audit logs, reducing unnecessary tournament-wide work during live scoring.",
        "Delivered near-real-time public updates through batched short polling, visibility-aware refresh behavior, lightweight tournament-revision checks, in-process caching, and in-flight request deduplication.",
        "Deployed on DigitalOcean with Nginx, a systemd-managed Node.js service, Let's Encrypt HTTPS, database-aware health checks, and documented PostgreSQL/media backup tooling.",
      ],
      metrics: [
        "30 application routes",
        "31 API routes",
        "23 Prisma models",
        "16 database migrations",
        "58 explicit domain/unit tests",
        "~17.4k major source lines",
      ],
      challengesAndDecisions: [
        "Bracket slots persist qualification sources such as group placement or wildcard rank, allowing organizers to configure future rounds before the actual qualifiers are known.",
        "Future tournament structure remains editable, but recorded scores and played matchups progressively lock historical state against unsafe regeneration.",
        "Optimistic versioning and serializable transactions reject scoring mutations made from stale operator state instead of allowing last-write-wins data loss.",
        "Short polling was chosen deliberately for the event scale, then optimized with jitter, hidden-tab behavior, revision signals, caching, and request deduplication.",
        "Operational checkpoints are scoped to recoverable event state rather than being presented as complete database backups; broader backups remain a separate deployment concern.",
        "Production simulation and destructive reset capabilities are restricted so testing tools cannot casually alter the live public competition.",
      ],
      outcome:
        "The result is a production event platform that brings tournament administration and the public live experience onto the same reliable domain model. It demonstrates configurable product architecture, complex sports rules, concurrency control, operational safety, privacy-aware analytics, and end-to-end deployment—not just a tournament website.",
      whatIdImproveNext: [
        "Add a sanitized fixture dataset so the repository can support a fully self-contained demo seed",
        "Move process-local caches and rate limits to shared infrastructure before horizontal scaling",
        "Expand automated end-to-end coverage for the highest-risk live operator workflows",
        "Continue reconciling older project documentation with the current source and migration history",
      ],
      links: {
        live: "https://mpwdinkanddash.cotabatopickleball.com",
        repo: "#",
      },
    },
  },

  {
    id: 8,
    portfolioGroups: ["rverse"],
    projectPriority: 1,
    status: "LIVE",
    title: "RVerse Play",
    workType: "Personal Product",
    role: "Product owner and full-stack developer",
    currentStatus: "Deployed",
    problemSolved:
      "Helps organizers run live pickleball sessions without manually tracking waiting players, court assignments, and repeated matchups.",
    stackSummary: "Next.js, React, TypeScript, Prisma, PostgreSQL, PayMongo",
    tags: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "PayMongo", "CSS"],
    description:
      "Session management and match rotation app for pickleball organizers, designed to run live multi-court sessions with fair player rotation, cleaner queue control, and reliable match history.",
    link: "https://rverse-play.vercel.app",
    realWorld: {
      usedIn: "Live community pickleball session operations",
      usedBy: "Session organizers and participating players",
      usageContext:
        "Built around the fast, on-the-ground needs of community sports organizers who have to keep courts moving, avoid confusion, and make fairness visible from a mobile device.",
    },
    caseStudy: {
      problem:
        "Casual and community pickleball sessions are often managed manually, which makes live rotations messy. Organizers end up juggling who has checked in, who is waiting, who should play next, which court is free, and how to avoid repeated pairings or uneven court time. That usually leads to confusion, longer waits, and a session flow that feels unfair even when everyone is trying to keep it organized.",
      constraints: [
        "The workflow had to stay fast enough for live session use, not feel like back-office software",
        "Mobile UX mattered because organizers often run sessions from a phone near the courts",
        "Automation needed to help, not remove organizer control over queue and matchup decisions",
        "State changes had to stay consistent across player status, court assignment, history, and stats",
        "Queue editing could not be interrupted by auto-refresh while an organizer was actively adjusting players",
        "Canceling a match needed explicit confirmation because it is a high-risk action in a live session",
        "The product intentionally excludes draws because that does not match the target pickleball workflow",
      ],
      solution:
        "I built RVerse Play as a structured live session workflow for pickleball organizers. The app lets an organizer create a session with a shareable join code, check players in, manage Waiting / Playing / Resting / Left states, assign and rotate across multiple courts, generate fair next matchups from the waiting queue, and keep session history and player-level logs consistent as matches are started, finished, canceled, edited, or removed.",
      highlights: [
        "Shareable session creation and player check-in flow",
        "Live player state handling for Waiting, Playing, Resting, and Left",
        "Multi-court support with queue-aware court assignment",
        "Auto-generated next matchups from waiting players with manual organizer override",
        "Cancel flow that returns players to the front of the waiting queue",
        "Editable match history with delete support and consistent stats/log updates",
        "Player detail views with matchup history, logs, wins, losses, and games played",
        "Locked pair support and optional skill balancing",
        "Fairness tracking through spread, showing the gap between max and min games played",
        "Realtime-style shared visibility through polling instead of full websocket infrastructure",
        "Mobile-friendly, tab-heavy, icon-led organizer interface",
      ],
      technicalImplementation: [
        "Built with Next.js App Router to support a responsive, app-like session management flow.",
        "Used Prisma with PostgreSQL for the core relational model, centered on Session, Player, Match, MatchPlayer, PlayerRelationship, and PlayerLog entities.",
        "Structured server routes around the session lifecycle: session creation, player check-in, player state changes, queue generation, match start, match finish, match cancelation, and history editing.",
        "Implemented custom matchmaking and queue generation logic to balance automation with fairness, while still allowing organizers to manually edit queued players before a match starts.",
        "Used polling for live-ish shared session visibility as a simpler realtime approach that fit the MVP stage without introducing websocket complexity too early.",
        "Handled history edits so related logs, player summaries, and session-level stats stay aligned instead of drifting out of sync after corrections.",
      ],
      challengesAndDecisions: [
        "One of the main product decisions was balancing automation with organizer control. Auto-generated matchups speed things up, but real sessions still need human judgment, so manual queue editing stayed part of the workflow.",
        "State consistency was a core technical challenge because a single action can affect player state, queue order, court occupancy, match history, and fairness tracking at the same time.",
        "Auto-refresh had to be treated carefully. Shared visibility is useful, but interrupting an organizer during queue edits would create a worse live experience, so editing states were protected from refresh interference.",
        "Cancelation was treated as high-risk because reversing a live match affects both queue fairness and records, so the UX uses explicit confirmation and returns players to the front of the queue instead of leaving them stranded.",
        "I intentionally left out draw support because it would add complexity without matching the real session rules this workflow was designed for.",
      ],
      outcome:
        "RVerse Play turns a usually manual, high-friction community sports operation into a clear live workflow. It helps organizers move sessions faster, makes fairness more visible, reduces repeated confusion around who plays next, and gives players a more trustworthy view of how the session is being managed.",
      whatIdImproveNext: [
        "Push the realtime model further with more granular sync once the product outgrows polling",
        "Add deeper fairness analytics and smarter matchup recommendations over longer sessions",
        "Expand shared player-facing views so participants can follow court flow with less organizer intervention",
        "Refine organizer shortcuts for faster queue editing during high-turnover sessions",
      ],
      links: {
        live: "https://rverse-play.vercel.app",
        repo: "#",
      },
    },
  },

  {
    id: 13,
    portfolioGroups: ["rverse"],
    projectPriority: 5,
    featured: true,
    featuredOrder: 3,
    status: "LIVE",
    title: "Cotabato Pickleball",
    workType: "Personal Product",
    role: "Product owner and full-stack developer",
    currentStatus: "Production",
    problemSolved:
      "Centralizes fragmented local court information so players can find venues, compare details, and use each court's actual booking channel.",
    stackSummary: "Next.js, React, TypeScript, Prisma, PostgreSQL, n8n, Leaflet, OpenStreetMap",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "n8n",
      "Leaflet",
      "OpenStreetMap",
      "DigitalOcean",
      "Nginx",
      "Node.js",
    ],
    description:
      "Production court-discovery platform for the Cotabato pickleball community, with 46 listed courts, searchable map/list views, venue details, booking-channel handoffs, live availability integrations for participating venues, owner verification context, and discovery-to-booking intent analytics.",
    link: "https://cotabatopickleball.com",
    screenshot: "/cbo-pickleball.png",
    screenshots: ["/cbo-pickleball.png"],
    heroCaption:
      "Public-facing court discovery product: a searchable local venue layer designed to move players from scattered information toward a clear booking or contact path.",
    proofLine: "46 listed courts · map discovery · availability sync · booking-intent analytics",

    realWorld: {
      usedIn: "Public local sports directory",
      usedBy: "Pickleball players, court visitors, and venue owners/managers validating listing details",
      usageContext:
        "Built around a real local discovery problem: court details are spread across Facebook pages, Messenger, phone contacts, external booking forms, and word of mouth.",
    },

    caseStudy: {
      problem:
        "Players around Cotabato have many pickleball venue options, but reliable court information is fragmented across social pages, direct messages, phone numbers, external booking tools, and manual updates. That makes it harder to compare locations, rates, court types, amenities, and booking methods before deciding where to play.",
      constraints: [
        "Represent listed courts accurately without treating listings as paid partners",
        "Support existing court booking workflows instead of forcing every venue into one native booking system",
        "Keep the public experience mobile-friendly for players searching near the courts",
        "Maintain court data quality as rates, contacts, locations, photos, and operating details change",
        "Normalize availability from venue-controlled booking sheets without making the directory the source of truth for those schedules",
        "Track booking/contact intent without inflating repeated button clicks into separate customer interest",
      ],
      solution:
        "I built Cotabato Pickleball as a public discovery layer for the local pickleball ecosystem. The platform aggregates court data into searchable list and map views, lets players inspect venue details, then hands them off to the court's official phone, Messenger, form, website, or external booking channel. For participating venues, live availability can also be synchronized from external booking sheets through n8n workflows instead of requiring the venue to abandon its existing process.",
      highlights: [
        "46 listed pickleball courts across Cotabato City and nearby areas",
        "Searchable court directory with list and map discovery",
        "Court detail pages with rates, location, court count, type, amenities, schedule, and booking/contact context where available",
        "Leaflet/OpenStreetMap-based court map with location pins",
        "Booking-channel aggregation for phone, social, forms, external booking platforms, and manual workflows",
        "Live court availability layer for integrated venues, with date navigation and sync/freshness state",
        "Owner verification and listing update workflow context for improving court data quality",
        "Analytics focused on traffic, court views, booking/contact intent, source attribution, and court performance",
      ],
      technicalImplementation: [
        "Built with Next.js, React, TypeScript, Tailwind CSS, Prisma, and PostgreSQL for a production full-stack web application.",
        "Modeled the product around court discovery first: searchable listings, court detail pages, map pins, and outbound booking/contact handoffs.",
        "Used Leaflet and OpenStreetMap for the core map experience without depending on a paid Google Maps API for court discovery.",
        "Built n8n workflows that normalize venue booking-sheet data and send structured availability into an internal sync endpoint, keeping the integration path flexible enough for additional venue sources over time.",
        "Added analytics around the discovery funnel: traffic, court views, booking/contact actions, unique intent, traffic sources, and court-level performance signals.",
        "Designed the content workflow around active data verification so court rates, contact methods, photos, locations, and operating details can improve over time.",
        "Deployed as a public production site with VPS-style infrastructure context, including Nginx/Node.js production deployment details from the provided project brief.",
      ],
      challengesAndDecisions: [
        "The main product decision was to start as a discovery layer instead of a full booking marketplace. That made the platform useful immediately while respecting each court's existing booking process.",
        "Data quality is part of the engineering problem. The platform has to handle incomplete, changing, or pending-verification listings while still being useful to players.",
        "Availability integrations treat external booking sheets as upstream sources, so freshness and sync state matter just as much as the parsed slots themselves.",
        "Analytics were framed around intent rather than vanity page views, so court owners can eventually understand views and booking/contact interest at the venue level.",
        "The long-term SaaS direction is native scheduling and booking infrastructure for interested courts, but the public portfolio copy keeps that as product direction rather than claiming it as implemented.",
      ],
      outcome:
        "Cotabato Pickleball is a live local platform rather than a tutorial directory. It combines product research, a real 46-court dataset, geospatial discovery, production deployment, booking-channel aggregation, early availability automation through n8n, analytics, and an operational path toward owner-verified listings and future court-owner tools.",
      whatIdImproveNext: [
        "Replace placeholder images with current production screenshots after a visual pass",
        "Continue owner verification and court data cleanup",
        "Expand automated availability coverage while keeping venue source freshness visible",
        "Expand court-owner analytics around listing views and booking/contact intent",
        "Evaluate native reservation workflows only for courts that are ready to move beyond external booking handoffs",
      ],
      links: {
        live: "https://cotabatopickleball.com",
        repo: "#",
      },
    },
  },

  {
    id: 1,
    portfolioGroups: ["rverse", "client"],
    projectPriority: 3,
    status: "LIVE_REBUILT",
    title: "RVerse Inventory",
    workType: "Personal Product",
    role: "Full-stack developer",
    currentStatus: "Deployed rebuild",
    problemSolved:
      "Keeps product, stock, sale, restock, and shop activity records in one workflow for small business operations.",
    stackSummary: "Next.js, React, TypeScript, Prisma, PostgreSQL, PWA; legacy Flask version",
    tags: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "PWA", "Python", "Flask"],
    description:
      "Inventory and sales tracker rebuilt from an earlier Flask web app into a Next.js PWA. The rebuild keeps the shop workflow while improving mobile use, startup time, and maintainability.",
    link: "https://rverse-inventory.vercel.app/",
    screenshot: "/inv1.png",
    screenshots: ["/inv1.png", "/inv2.png", "/inv3.png", "/inv4.png","/ss6.png", "/ss.png", "/ss2.png", "/ss3.png", "/ss4.png", "/ss5.png"],

    realWorld: {
      usedIn: "Operational inventory and sales workflow",
      usedBy: "Shop owner / staff users",
      usageContext:
        "The legacy app remains represented as the first production version, while the Next.js rebuild shows the current direction: faster startup, better mobile/PWA experience, cleaner maintainability, and the same inventory/sales foundation.",
    },

    caseStudy: {
      problem:
        "The original Flask inventory app proved the workflow in real use, but the stack started to limit the product: Render cold starts made access feel slow, Flask made UI evolution less flexible, and the growing feature set needed a cleaner full-stack structure without throwing away the existing database foundation.",
      constraints: [
        "Keep the legacy Flask web app visible as the first production version",
        "Rebuild around the same PostgreSQL database family and shop workflow",
        "Avoid breaking core flows: login, shop access, inventory, sales, logs, and statistics",
        "Improve mobile usability through a PWA-ready Next.js interface",
        "Remove Render cold-start friction and reduce runtime/deployment limitations from the Flask version",
      ],
      solution:
        "Rebuilt RVerse Inventory as a Next.js App Router PWA using TypeScript, Prisma, PostgreSQL, Server Actions, custom session cookies, and a cleaner tab-heavy mobile layout. The legacy version stays in the portfolio as the validated production foundation, while the Next.js version is presented as the modernization path.",
      highlights: [
        "Clear project evolution: Legacy Flask app to Current Next.js PWA",
        "Same core inventory and sales workflow preserved across the rebuild",
        "Prisma schema mirrors the existing PostgreSQL tables used by the original app",
        "Mobile-first navigation with Quick Sale, Sales, Inventory, Logs, and Settings flows",
        "Owner/worker shop model, admin shop access toggle, and shop disabled handling",
        "Quick sale, unowned item sale, restock, inventory search, item details, sales remarks, logs, and statistics",
        "Reason for transition: Flask/runtime limits plus Render cold-start delays",
      ],
      whatIdImproveNext: [
        "Move production uploads from local public/uploads to object storage",
        "Harden every action with deeper validation and transaction-safe bulk checkout",
        "Add stronger audit coverage for admin and inventory-sensitive actions",
        "Finalize the live deployment path for the Next.js version after database reconciliation",
      ],
      links: {
        live: "https://rverse-inventory.vercel.app/",
        repo: "#",
      },
    },
  },

  {
    id: 2,
    portfolioGroups: ["independent"],
    projectPriority: 5,
    status: "DEPLOYED_INTERNAL",
    workType: "Internal System",
    role: "System designer and full-stack developer",
    currentStatus: "Deployed internally",
    problemSolved:
      "Tracks where a document is, who handled it, what office it was routed to, and what movement happened over time.",
    stackSummary: "PHP, MySQL, JavaScript, HTML, CSS",
    featured: true,
    featuredOrder: 1,
    title: "Ministry of Public Works Regional Office Document Tracking System",
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    description:
      "Built for internal government document routing and monitoring. The system helps staff track document status, routing history, assigned offices, and movement logs with role-based access and audit visibility.",

    link: "https://doctracker.mpwppd.online",
    screenshot: "/mpw-dts.png",
    screenshots: ["/mpw-dts.png", "/dt2.png", "/dt3.png", "/dt5.png", "/dt1.png"],
    heroCaption:
      "Internal government workflow system centered on traceable document movement, current ownership, role-aware routing, and a complete operational audit trail.",
    proofLine: "100+ internal users · branching routing · current-holder visibility · full movement audit trail",
    screenshotCaptions: [
      "System overview highlighting routing, visibility, audit trail, and operational monitoring.",
      "Document work queue with status filters, ownership context, search, and routing-ready actions.",
      "Document detail view keeps the live routing timeline visible beside the operational work queue.",
      "Document detail view brings attachments and movement history into the same traceable record.",
      "Released-document state preserves record details, attachments, and movement history after completion.",
    ],

    realWorld: {
      usedIn: "Ministry of Public Works – Technical Services",
      usedBy: "Director’s Office, division chiefs, section staff, and routing personnel",
      usageContext:
        "Used for real document routing across divisions, ensuring visibility, accountability, and traceability from submission to release.",
    },

    caseStudy: {
      problem:
        "Document routing across divisions lacked clarity: multiple recipients, unclear ownership, and no reliable way to track who currently holds a document or who has acted on it.",

      constraints: [
        "Multi-recipient routing (branching)",
        "User-based visibility (not just section-based)",
        "Strict audit trail (who/when/from-to)",
        "Real-world usability for non-technical staff",
        "Government workflow constraints and hierarchy",
      ],

      solution:
        "Designed and built a workflow-aware tracking system where documents move through auditable events, supporting branching routes, clear ownership, and role-aware visibility across divisions.",

      highlights: [
        "Branching document routing for multi-recipient workflows",
        "Per-user visibility rather than section-only access",
        "Assistant mode for delegation without account sharing",
        "Document families, child documents, and continuation tracking",
        "Full movement timeline with current-holder visibility and audit history",
        "Role-aware routing across divisions and sections",
        "Attachment lifecycle handling and mobile-friendly document actions",
        "Production support for an internally deployed system used by 100+ users",
      ],

      technicalImplementation: [
        "Built the core application with PHP, MySQL, JavaScript, HTML, and CSS around event-style document movement records instead of a single mutable status field.",
        "Designed routing and visibility rules around actual users and office hierarchy so branching sends and delegated assistance remain traceable.",
        "Added document-family behavior for related and continuation records while preserving movement history on each record.",
        "Separated operational document history from file attachment handling so routing context remains auditable as files are added or removed.",
        "Maintained the production system on AWS infrastructure with recurring backup and production-support workflows.",
      ],

      outcome:
        "The system became a real internal workflow tool rather than a passive registry: staff can see where a document is, who has acted on it, how it moved, and what remains pending without reconstructing the trail manually.",

      whatIdImproveNext: [
        "SLA timers and delay escalation",
        "Analytics dashboard (bottlenecks, turnaround time)",
        "Advanced search (full-text + filters)",
        "Org-chart-driven routing automation",
      ],

      links: {
        live: "https://doctracker.mpwppd.online",
        repo: "#",
      },
    },
  },

  {
    id: 9,
    portfolioGroups: ["rverse"],
    projectPriority: 3,
    status: "IN_PROGRESS",
    title: "RVerse HRMS",
    workType: "Personal Product",
    role: "Product designer and full-stack developer",
    currentStatus: "In progress",
    problemSolved:
      "Organizes personnel records, employment history, contract status, and salary references for government HR work.",
    stackSummary: "Laravel, React, TypeScript, Inertia.js, Tailwind CSS, PostgreSQL",
    tags: ["Laravel", "React", "TypeScript", "Inertia.js", "Tailwind CSS", "PostgreSQL"],
    description:
      "Government HRMS prototype for managing personnel records, employment history, contract monitoring, salary schedules, agency branding, and employee self-service profile views.",
    link: "#",
    screenshot: "/govhr-dashboard-placeholder.svg",
    screenshots: [
      "/govhr-dashboard-placeholder.svg",
      "/govhr-employees-placeholder.svg",
      "/govhr-profile-placeholder.svg",
      "/govhr-contracts-placeholder.svg",
      "/govhr-salary-placeholder.svg",
    ],

    realWorld: {
      usedIn: "Government HRMS",
      usedBy: "HR administrators, HR staff, division heads, section heads, auditors, and employees",
      usageContext:
        "Designed for agency personnel offices that need one place to view employee records, current assignments, compensation references, contract status, and employee-facing profile information.",
    },

    caseStudy: {
      problem:
        "Personnel records are difficult to review when employee identity, current position, employment history, compensation references, documents, and contract end dates are tracked in separate files or manual lists.",
      constraints: [
        "Role-based access for HR, agency administrators, heads, auditors, and employee users",
        "Agency-scoped records so users only see the personnel data they are allowed to access",
        "Support for government employment types including plantilla, casual, coterminous, JO, COS, and contractual",
        "Clear mobile navigation for office staff who need to browse records quickly",
        "Configurable agency branding without source-code changes",
      ],
      solution:
        "Built a Laravel 12 and React/Inertia HRMS prototype with an agency-scoped dashboard, employee directory, employee profile sections, contract monitoring, salary schedule explorer, employee portal, and branding settings.",
      highlights: [
        "Employee records and contract monitoring",
        "Employee directory with search and filters for status, employment type, division, and section",
        "Employee profile pages with overview, personal details, employment timeline, compensation records, documents, and activity log sections",
        "Contract monitoring for active JO, COS, and contractual records ordered by end date",
        "Salary schedule explorer with rates grouped by schedule year and tranche",
        "Employee portal that redirects employee-only accounts to their own profile",
        "Agency branding settings for header title, subtitle, logo, and color values",
        "Role and permission structure using Spatie Laravel Permission",
      ],
      technicalImplementation: [
        "Used Laravel 12 for routing, controllers, policies, Eloquent models, and agency-scoped database queries.",
        "Built the interface with React, TypeScript, Inertia.js, Tailwind CSS, lucide-react icons, and Vite.",
        "Modeled employees around personal details, employment records, compensation records, documents, audit logs, salary schedules, offices, divisions, and sections.",
        "Implemented controller-level filtering for employee search, employment type, status, division, and section.",
        "Added role-aware navigation and employee-only dashboard redirection to keep staff and employee workflows separate.",
        "Prepared export and document-generation support through Laravel Excel and DomPDF dependencies.",
      ],
      challengesAndDecisions: [
        "The main design decision was keeping the system records-first instead of making it a payroll app. It focuses on personnel data, assignments, contracts, salary references, and traceability.",
        "Agency scoping was treated as a core rule because HR records should not leak across offices or agencies.",
        "The profile page uses tab-style sections so long personnel records stay browsable without pushing everything into one long page.",
        "Employee users are redirected to a separate profile view so self-service access does not expose HR administration screens.",
      ],
      outcome:
        "The prototype establishes a practical HR records foundation for government offices: staff can search personnel, review employment and compensation history, monitor contracts, and expose a limited employee-facing profile view from the same system.",
      whatIdImproveNext: [
        "Add create and update workflows for employee records, documents, and compensation entries",
        "Add import templates for bulk employee setup and salary schedule data",
        "Expand audit logging around sensitive HR record changes",
        "Add printable personnel summaries and contract monitoring reports",
        "Replace placeholder screenshots with real production screenshots after UI review",
      ],
      links: {
        live: "#",
        repo: "#",
      },
    },
  },

  {
    id: 3,
    portfolioGroups: ["rverse", "client"],
    projectPriority: 3,
    status: "LIVE",
    title: "RVerse POS",
    workType: "Client Project",
    role: "Android developer",
    currentStatus: "In use",
    problemSolved:
      "Supports fast offline checkout, sales recording, and receipt printing for a small shop cashier workflow.",
    stackSummary: "Kotlin, Android XML, Room, SQLite, Bluetooth ESC/POS",
    tags: ["Kotlin", "Android (XML)", "Room", "SQLite", "Material3", "Bluetooth (ESC/POS)", "Offline-first"],
    description:
      "Offline-first Android POS built for real cashier workflow with fast checkout, customizable drink modifiers, weekly sales reports, and Bluetooth receipt printing.",
    link: "#",
    screenshot: "/p5.jpg",
    screenshots: ["/p5.jpg", "/p6.jpg", "/p2.jpg", "/p3.jpg", "/p1.jpg"],

    realWorld: {
      usedIn: "Real shop/cashier environment",
      usedBy: "Cashier / small business operators",
      usageContext:
        "Designed for daily retail operations where speed, reliability, and offline capability are critical.",
    },

    caseStudy: {
      problem:
        "Manual sales logging and unreliable POS systems slow down checkout and break when internet connectivity drops.",

      constraints: [
        "Must work fully offline",
        "Fast checkout UI (no lag)",
        "Reliable data persistence",
        "Stable Bluetooth printing",
        "Tablet landscape UI optimized for POS workflow",
      ],

      solution:
        "Built an offline-first Android POS using Kotlin with a Room-powered local database, structured checkout flow, and ESC/POS Bluetooth printing. The system prioritizes speed, reliability, and a clear cashier workflow.",

      highlights: [
        "Fast cashier-optimized checkout UI",
        "Offline-first architecture using Room + SQLite",
        "Weekly sales reports with browsable history",
        "Customizable product options (size, add-ons, sugar levels)",
        "Bluetooth receipt printing",
        "Tablet landscape POS interface",
        "Sales history and inventory tracking",
      ],

      whatIdImproveNext: [
        "Sticker printing for drinks/kitchen labels",
        "Printing queue and retry handling",
        "Data persistence/backup across wipes or updates",
        "Exportable reports (CSV or spreadsheet)",
        "Further UI polish for cashier speed",
      ],

      links: {
        live: "#",
        repo: "#",
      },
    },
  },


  {
    id: 4,
    portfolioGroups: ["client"],
    projectPriority: 2,
    status: "LIVE",
    title: "Utang Tracker",
    workType: "Client Project",
    role: "Full-stack developer",
    currentStatus: "Deployed",
    problemSolved:
      "Replaces chat notes and spreadsheets for tracking receivables, payables, and collection activity.",
    stackSummary: "Next.js, TypeScript, Prisma, PostgreSQL, PWA",
    tags: ["Next.js", "TypeScript", "PWA", "Prisma", "PostgreSQL", "CSS"],
    description:
      "Progressive web app for managing client receivables, collection workflows, and personal payables through a mobile-friendly interface designed for real-world lending operations.",
    link: "https://utang-tracker-mvp.vercel.app",
    screenshot: "/ft1.png",
    screenshots: ["/ft1.png", "/ft2.png", "/ft3.png", "/ft4.png", "/ft5.png"],

    realWorld: {
      usedIn: "Active real-world usage",
      usedBy: "Non-technical users",
      usageContext:
        "Used for tracking client debts, collections, and financial obligations in daily operations.",
    },

    caseStudy: {
      problem:
        "Client debt tracking becomes messy when handled through chats, notes, and spreadsheets.",
      constraints: [
        "Must support real lending workflows",
        "Mobile-first experience",
        "Clear receivables vs payables separation",
      ],
      solution:
        "Built a structured lending tracker for managing receivables, payables, and collection workflows.",
      highlights: [
        "Real-world lending usage",
        "Receivables + payables tracking",
        "Collection workflow visibility",
        "Mobile-friendly PWA",
      ],
      whatIdImproveNext: [
        "Automated reminders",
        "Receipt printing",
        "Advanced dashboards",
      ],
      links: {
        live: "https://utang-tracker-mvp.vercel.app",
        repo: "#",
      },
    },
  },

  {
    id: 5,
    portfolioGroups: ["rverse"],
    projectPriority: 3,
    featured: false,
    status: "LIVE",
    title: "RVerse Finance",
    workType: "Personal Product",
    role: "Product owner and full-stack developer",
    currentStatus: "Deployed",
    problemSolved:
      "Brings accounts, budgets, dues, receivables, payables, and activity history into one personal finance workspace.",
    stackSummary: "Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    description:
      "Personal finance web app for tracking net worth, budgets, dues, receivables, payables, accounts, and activity history in one place.",
    link: "https://finance-tracker-bay-pi.vercel.app/",
    screenshot: "/rversefinance.png",
    screenshots: ["/rversefinance.png", "/pf1.png", "/pf2.png", "/pf3.png", "/pf4.png", "/pf5.png"],

    realWorld: {
      usedIn: "Personal finance product development",
      usedBy: "Personal use / target real-world users",
      usageContext:
        "Designed as a daily finance command center for tracking net worth movement, due pressure, account balances, and budget pacing across mobile and desktop.",
    },

    caseStudy: {
      problem:
        "Personal finance gets fragmented when accounts, budgets, credit dues, receivables, payables, and activity history all live in separate views or tools.",
      constraints: [
        "Must feel calm and scannable instead of noisy",
        "Needs strong mobile UX without sacrificing feature coverage",
        "Should surface urgent money actions using real due windows",
        "Financial logic must match real billing and settlement behavior",
      ],
      solution:
        "Built a unified finance dashboard that treats net worth as the product's organizing system, combining accounts, budgets, dues, receivables, payables, and activity history into one actionable flow.",
      highlights: [
        "Dashboard-first UX centered on net worth movement and due awareness",
        "Budget health redesigned around percentage left, pacing, and clearer mobile readability",
        "Credit-card due logic based on statement day and due day, reflected in timeline signals",
        "Accounts system with branded provider styling, conditional fields, and balance visibility toggles",
        "Activity history reframed around real net worth movement and truthful debt settlement behavior",
        "Dedicated logged-out landing page with distinct branding, finance-led visuals, and restrained motion",
      ],
      whatIdImproveNext: [
        "Recurring transaction automation and reminders",
        "Deeper analytics and trend breakdowns",
        "Expanded financial insights for planning and forecasting",
      ],
      links: {
        live: "https://finance-tracker-bay-pi.vercel.app/",
        repo: "#",
      },
    },
  },


  {
    id: 6,
    portfolioGroups: ["rverse", "client"],
    projectPriority: 3,
    status: "LIVE",
    title: "RVerse Payroll",
    workType: "Client Project",
    role: "Full-stack developer",
    currentStatus: "Deployed",
    problemSolved:
      "Helps a small business encode absences, advances, bonuses, employee records, and payroll periods without manual payday computation.",
    stackSummary: "Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, PWA",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "PWA"],
    description:
      "Payroll and attendance PWA for shop operations, built around owner-encoded absences, employee records, advances, bonuses, payroll schedules, and period-based payroll generation.",
    link: "https://rverse-payroll.vercel.app/",
    screenshot: "/rp1.png",
    screenshots: ["/rp1.png", "/rp2.png", "/rp3.png", "/rp4.png"],

    realWorld: {
      usedIn: "Small business payroll operations",
      usedBy: "Shop owner / payroll encoder",
      usageContext:
        "Designed for tire, rims, delivery, and small-shop workflows where the owner records attendance, absences, advances, bonuses, and payroll periods without needing a biometric device.",
    },

    caseStudy: {
      problem:
        "Small shops often track attendance, absences, salary schedules, advances, and payroll deductions manually, which makes payday computation slow and error-prone.",
      constraints: [
        "Owner-encoded attendance instead of employee self check-in",
        "Absence-first workflow with active employees treated as present by default",
        "Flexible sahod schedules: daily, weekly, twice a month, or monthly",
        "Must support advances, payables, and bonuses without complicating the daily workflow",
        "Mobile-friendly PWA layout with compact navigation for shop use",
      ],
      solution:
        "Built a Next.js PWA that centralizes employee management, attendance encoding, advances, bonuses, payroll settings, and payroll generation. The system uses Prisma and PostgreSQL for structured records, then computes payroll periods based on the selected pay schedule.",
      highlights: [
        "Owner-managed absence checklist for fast attendance encoding",
        "Employee directory with daily rate, status, and payroll details",
        "Advances and payables tracking with running balances",
        "Bonus management for payroll adjustments",
        "Configurable payroll schedules: daily, weekly, twice a month, and monthly",
        "Payroll generation, review, and finalize flow",
        "PWA-ready with manifest, service worker, and Vercel Singapore region config",
      ],
      whatIdImproveNext: [
        "Printable payslips for each payroll period",
        "CSV or Excel export for payroll summaries",
        "Role-based access for owner vs encoder accounts",
        "Holiday, overtime, and richer deduction rules",
        "Offline sync hardening for real shop environments",
      ],
      links: {
        live: "https://rverse-payroll.vercel.app/",
        repo: "#",
      },
    },
  },

  {
    id: 10,
    portfolioGroups: ["client"],
    projectPriority: 4,
    visibility: "Private",
    status: "IN_USE",
    title: "Al-Amanah Cooperative Management System",
    workType: "Client Project",
    role: "Full-stack developer",
    currentStatus: "In use",
    problemSolved:
      "Keeps member records, contributions, loan activity, payments, and activity history in one controlled office system.",
    stackSummary: "Laravel, PHP, MySQL, JavaScript, HTML, CSS",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    description:
      "Cooperative operations system for member records, contributions, loans, payments, role-based access, and activity tracking.",
    link: "#",

    realWorld: {
      usedIn: "Cooperative office operations",
      usedBy: "Administrative staff and cooperative officers",
      usageContext:
        "Built for day-to-day cooperative work where staff need clear records, payment history, member activity, and controlled access to operational modules.",
    },

    caseStudy: {
      problem:
        "Member records, contribution updates, loan activity, and payment tracking become difficult to manage when they are spread across manual files or separate spreadsheets.",
      constraints: [
        "Private client system",
        "Preserve existing office workflows",
        "Role-based access for operational modules",
        "Clear audit trail for sensitive activity",
      ],
      solution:
        "Built a Laravel-based cooperative management system that keeps member information, contribution records, loan activity, payments, and activity logs in one controlled workspace.",
      highlights: [
        "Member registry and profile records",
        "Contribution and payment tracking",
        "Loan activity support",
        "Role-aware access to operational pages",
        "Activity logging for traceability",
      ],
      whatIdImproveNext: [
        "Add stronger report exports",
        "Improve dashboards for payment and loan monitoring",
        "Expand audit coverage for sensitive record updates",
      ],
      links: {
        live: "#",
        repo: "#",
      },
    },
  },

  {
    id: 12,
    portfolioGroups: ["independent"],
    projectPriority: 4,
    status: "DEPLOYED_INTERNAL",
    title: "Project File & Folder Automation Suite",
    workType: "Windows Desktop Automation Utility",
    role: "Utility developer",
    currentStatus: "In use",
    problemSolved:
      "Automates bulk folder generation and file/folder renaming for government infrastructure project records.",
    stackSummary: "Windows Desktop Utility, Excel Data Processing, File System Automation, Portable Executable",
    tags: ["Windows Desktop Utility", "Excel Data Processing", "File System Automation", "Portable Executable"],
    description:
      "Developed portable Windows utilities that automate bulk folder generation and intelligent file/folder renaming from Excel project lists, supporting the consistent organization of 80,000+ infrastructure project records.",
    link: "#",
    screenshot: "/rversetools.png",
    screenshots: ["/rversetools.png"],

    realWorld: {
      usedIn: "Government infrastructure project file organization",
      usedBy: "Office staff handling project records",
      usageContext:
        "Designed for non-technical staff who need to organize project records by district, year, project code, and project name without manually creating or renaming each folder.",
    },

    caseStudy: {
      problem:
        "Project records are organized by district, year, project code, and project name. Staff previously had to copy project information from Excel, create folders one at a time, and rename existing files or folders individually. The work was repetitive, time-consuming, and prone to inconsistent naming and human error across multiple districts and implementation years.",
      constraints: [
        "Input had to come from existing Excel project lists",
        "Staff needed to choose worksheets and relevant columns before processing",
        "One-column and two-column Excel formats both had to be supported",
        "The utilities had to preview changes before applying them",
        "Duplicate, unmatched, and conflicting records needed clear handling",
        "The tools had to be portable Windows executables for non-technical office staff",
      ],
      solution:
        "Built a set of portable Windows desktop utilities that import project data from Excel, generate folders in bulk using project codes and names, rename existing files and folders through forward or reverse matching, and show clear results for successful, skipped, unmatched, and error records.",
      highlights: [
        "Excel-based data import",
        "Configurable worksheet and column selection",
        "One-column or two-column input support",
        "Bulk folder generation",
        "Forward matching using project codes",
        "Reverse matching using project names",
        "Optional PLAN and POW document prefixes",
        "Naming preview before execution",
        "Duplicate and conflict handling",
        "Clear success, skipped, unmatched, and error results",
      ],
      technicalImplementation: [
        "Used a portable Windows utility approach so staff can run the tools without a web deployment or server setup.",
        "Structured the workflow around Excel data selection, generated-name preview, validation, batch execution, and result review.",
        "Handled one-column and two-column source formats so existing project lists do not need to be rebuilt before use.",
        "Added matching rules for project-code-first and project-name-first renaming so existing folders can be organized from either available identifier.",
        "Included safeguards for duplicates, unmatched records, and possible naming conflicts before applying changes to the file system.",
      ],
      workflow: [
        "Import the Excel project list",
        "Select the worksheet and project code/name columns",
        "Choose folder generation or file/folder renaming",
        "Preview the proposed names",
        "Process the batch",
        "Review success, skipped, unmatched, and error results",
      ],
      beforeAfter: {
        before:
          "Excel list -> manually copy project code -> create folder -> copy project name -> rename folder -> repeat for every project",
        after:
          "Select Excel file -> choose columns -> preview generated names -> process the entire batch -> review results",
      },
      metrics: [
        "80,000+ project files and folders supported",
        "Approximately 100 records processed per typical batch",
        "Multiple districts supported",
        "Project records covering several implementation years",
        "One reusable utility replacing repetitive manual folder creation and renaming",
      ],
      exampleOutput: [
        "PLAN-22-RIL2RD917 - Concreting of Bubonga Ranao to Picotaan Road Phase 1, Binidayan",
        "POW-22-RIL2RD917 - Concreting of Bubonga Ranao to Picotaan Road Phase 1, Binidayan",
      ],
      outcome:
        "The utilities support the organization of a repository containing 80,000+ existing and future project files and folders. A typical batch may process around 100 project records at once, replacing repeated manual copy-paste work with a consistent reusable workflow.",
      whatIdImproveNext: [
        "Add clearer progress reporting for larger batches",
        "Add exportable result logs for office recordkeeping",
        "Add more guided templates for common district and year folder structures",
      ],
    },
  },

  {
    id: 11,
    portfolioGroups: ["client"],
    projectPriority: 4,
    visibility: "Private",
    status: "IN_PROGRESS",
    featured: true,
    featuredOrder: 2,
    title: "Office of the Chief Minister Clinic EMR and Inventory System",
    workType: "Client Project",
    role: "Full-stack developer",
    currentStatus: "In progress",
    problemSolved:
      "Connects clinic records, consultations, medicine stock, dispensing activity, and reports so records and inventory stay aligned.",
    stackSummary: "Next.js, React, TypeScript, Prisma, PostgreSQL, Tailwind CSS",
    tags: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    description:
      "Clinic records and inventory system for managing patient records, consultations, medicine stock, dispensing activity, and operational reports.",
    link: "#",
    screenshot: "/ocm-theclinic.png",
    heroCaption:
      "Private clinic system connecting patient records, consultations, medicine inventory, dispensing activity, and operational reporting in one workflow.",
    proofLine: "Patient records · clinical documentation · medicine inventory · reporting in one connected system",

    realWorld: {
      usedIn: "Clinic operations",
      usedBy: "Clinic staff, medical users, and inventory personnel",
      usageContext:
        "Built around clinic workflows that need patient history, consultation records, medicine availability, and inventory movement to stay connected.",
    },

    caseStudy: {
      problem:
        "Clinic records and medicine inventory are hard to keep aligned when patient history, consultation notes, dispensing, and stock counts are handled in separate tools.",
      constraints: [
        "Private clinic system",
        "Patient information must stay controlled",
        "Inventory movements must match clinical usage",
        "Reports should support office review without exposing unnecessary data",
      ],
      solution:
        "Built an EMR and inventory workflow that connects patient records, consultations, medicine tracking, dispensing activity, and stock monitoring through a structured database model.",
      highlights: [
        "Patient registry with unique patient numbers and expanded medical-information fields",
        "Appointment, assessment, and clinical documentation workflows",
        "Doctors' Order and Medical Allowance forms",
        "CSM completion gate before a visit can be completed",
        "Medicine inventory, dispensing remarks, stock history, and expiry warnings",
        "Daily, weekly, monthly, quarterly, and annual medicine reports",
        "Referral scheduling and vaccine-request workflows",
        "Autosave for clinical drafts with manual-save race protection",
      ],
      technicalImplementation: [
        "Built with Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, and PostgreSQL around connected patient, visit, medicine, and request records.",
        "Added unique patient-number backfill while preserving existing patient data and legacy agency values.",
        "Restricted patient-information editing to Admin users while keeping clinical workflows available to the appropriate staff roles.",
        "Reused existing referral and visit-request models for referral scheduling and vaccine requests instead of creating parallel workflows.",
        "Designed medicine reporting from stock and dispensing activity so operational reports stay tied to the underlying inventory history.",
      ],
      whatIdImproveNext: [
        "Continue end-to-end validation of the highest-risk clinical and inventory flows",
        "Deepen reporting filters and printable clinical summaries",
        "Refine stock-alert thresholds and medicine-expiry workflows",
      ],
      links: {
        live: "#",
        repo: "#",
      },
    },
  },
];
