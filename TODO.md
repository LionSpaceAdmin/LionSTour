# LionSTour — Complete Specification

## לייאונס טור — פלטפורמת חוויות ישראל // מפרט מלא

## 🚨 THIS IS THE COMPLETE SPECIFICATION — USE ONLY THIS 🚨

> Note: Generated from Setup Pattern v1.0
> Baseline: Next.js App Router + Supabase Starter (Prisma + Tailwind + next-intl)
> Vision: “Discover Israel through the people who live it” / “לגלות את ישראל דרך האנשים שחיים אותה”

---

## 📋 Platform Overview

### 🎯 Core Purpose

Help travelers, educators, and organizations experience authentic, story-driven, and safe journeys in Israel by connecting them with local veteran guides and diverse communities.

- Audience: independent travelers, families, schools, community groups, enterprises
- Primary jobs-to-be-done:
  - Find authentic experiences by region/theme
  - Match with trusted local guides
  - Plan story-based itineraries with AI assistance
  - Book safely and manage logistics
- Non-goals: generic OTA price comparison, flights/hotels marketplace, unrelated destinations

### 🌟 Vision Statement

“Discover Israel through the people who live it” / “לגלות את ישראל דרך האנשים שחיים אותה”

### 🧭 Core Philosophy

- Human-first
- Story-centric
- Authenticity over polish
- Accessibility & inclusion
- Performance & reliability
- Trauma-aware, safety-first storytelling in a postwar reality
- Bridge-building across cultures and communities
- Local economic empowerment with transparency
- Education through lived experience
- Regenerative and respectful tourism practices

---

## 🔧 Technical Foundation

### Tech Stack (edit to match project)

- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS 4
- Backend: Supabase (Postgres) + Auth + RLS, Prisma Client
- Integrations: Stripe Payments, Mapbox maps, next-intl (en/he)
- Performance Targets: LCP ≤ 2.5s, TTI ≤ 3s, Lighthouse ≥ 90

### Design Principles

- Emotional design (warm, human visuals)
- Accessibility (WCAG 2.1 AA)
- Mobile-first, performance-first
- Culturally sensitive, multilingual (en/he)
- Content authenticity (avoid stock when possible)
- Safety indicators visible at key decision points
- Prefer progressive media (video poster, lazy loading) and skeletons
- RTL-first with graceful LTR support

---

## 🎯 Priority 1: Foundation Transformation (CRITICAL)

### 1.1 Landing Page (`src/app/page.tsx`) — In progress

Objective: Transform existing landing into a domain-specific, emotional discovery page.

Current State: Emotional hero, AI journey planner, personal stories, community showcase, experience windows preview, and CTA are implemented with dynamic imports and accessibility improvements.
Target State: Finalize copy, ensure all CTAs route into planning and experiences, refine performance budgets and skeletons, verify i18n completeness.

- PRESERVE navigation structure and accessibility
- REPLACE headline with domain tagline from i18n if missing
- TRANSFORM Hero → EmotionalHero (done)
- REPLACE boilerplate with PersonalStories (done)
- ADD CommunityShowcase (done)
- ADD ExperienceWindows preview (done)
- MAINTAIN responsive layout classes (done)
- PRESERVE Auth integration & language switcher (done)
- TEST all existing functionality and loading states

Files to Modify:

- `src/app/page.tsx`
- `src/components/hero.tsx`
- `src/components/personal-stories.tsx`
- `src/components/community-showcase.tsx`
- `src/components/experience-windows-preview.tsx`

Acceptance Criteria:

- Page loads ≤ 2.5s on Fast 3G
- Hero is emotionally compelling & responsive
- Stories feel authentic and personal
- CTAs lead into planning flow
- Existing auth preserved

### 1.2 Root Layout (`src/app/layout.tsx`) — Done (verify metadata and RTL)

Objective: Enhance layout while preserving functionality

- PRESERVE ThemeProvider configuration & fonts (Heebo loaded via next/font)
- PRESERVE HTML structure & hydration (done)
- UPDATE metadata (title/description) for both EN/HE (partial HE in place)
- ADD Supabase provider if needed for SSR (deferred; currently using client supabase)
- ADD RTL/Hebrew support (lang="he" dir="rtl" set)
- TEST everything still works

Files to Modify: `src/app/layout.tsx`, `src/app/globals.css`

Acceptance Criteria:

- Layout applies globally
- Providers load correctly
- Metadata correct (OG/Twitter)
- RTL/i18n works

### 1.3 Hero Component (`src/components/hero.tsx`) — Done (copy polish)

Objective: Transform hero into emotional, domain-specific hero

- PRESERVE exports, responsive classes, a11y attrs
- REPLACE copy with emotional tagline driven by i18n (present)
- REPLACE CTA with primary CTA to Plan Journey (present)
- ADD background image/video (handled by `VideoBackground`)
- UPDATE feature list → benefits (N/A in hero; benefits are elsewhere)
- ENSURE a11y & responsiveness

Acceptance Criteria: clear hero narrative, fast media load, prominent CTA.

### 1.4 Global Styles (`src/app/globals.css`) — In progress

Objective: Add domain palette/typography while preserving Tailwind setup

- PRESERVE Tailwind base variables
- ADD palette tokens (brand warm amber/earth tones) (present)
- ADD emotional typography scales (present)
- ADD component style variants (buttons/cards present)
- TEST regressions and prefers-reduced-motion (present)

Acceptance Criteria: warm palette, readable type, no corporate coldness, no regressions.

---

## 🎯 Priority 2: New Pages (AFTER P1)

### 2.1 Experiences / Gallery (`src/app/experiences/page.tsx`)

- Gallery-style narrative windows (implemented via `ExperienceCarousel` and `ExperienceWindows` preview)
- Story-based filters (`StoryFilters`) with categories
- Map as secondary view (`MapView`)
- Guide spotlight per experience (`GuideSpotlight`)
- Featured section (Experience of the Week)
- Maintain responsive patterns; FCP < 2s

### 2.2 Guide Profile (`src/app/guides/[id]/page.tsx`)

- Immersive personal story (`PersonalStory`)
- Journey timeline (`JourneyTimeline`)
- Authentic media gallery (extend as needed)
- Availability calendar (`AvailabilityCalendar`)
- Testimonials (`TestimonialGallery`)
- Community connection section (`CommunityConnection`)

### 2.3 Planner (`src/app/plan/page.tsx`)

- Emotional questionnaire and AI planner (`AIJourneyPlanner`, `PlanClient`)
- Story-based itinerary and guide matching
- Emotional previews and share/export (export to PDF deferred)
- `/api/itineraries` integration (exists)

---

## 🎯 Priority 3: Authentication (AFTER P1)

**Login** (`src/app/auth/login/page.tsx`) and **Sign Up** (`src/app/auth/sign-up/page.tsx`)

- Preserve Supabase Auth flows (magic link, OAuth) — implemented in login
- Update messaging (emotional/community) — present
- Enhance visuals (warm, accessible)
- Verify redirects, error states

---

## 🎯 Priority 4: Protected Areas (AFTER P2)

**User Dashboard** (`/protected/dashboard`) — deferred

- Bookings, profile, preferences, history, favorites, upcoming
- Supabase data wiring; profile updates

**Admin Dashboard** (`/protected/admin`) — deferred

- CRUD guides/experiences/bookings
- Moderation tools, RBAC via RLS, audit logs

---

## 🎯 Priority 5: Content (AFTER P2)

**Academy/Content Hub** (`/academy`)

- Article listing (from CMS/Supabase or static i18n for now)
- Category filters, search, previews, SEO, WCAG AA, MDX (later)

**Trust & Safety** (`/trust/safety`)

- Standards, emergency contacts, SOS, multilingual, links, trust indicators

**Enterprise** (`/enterprise`)

- Partner value, tiers, inquiry form (stored in DB), success stories, API docs link

---

## 🎯 Priority 6: Database & API (AFTER P3)

### 6.1 Schema (Supabase)

- Keep existing client/auth/middleware
- profiles, guides, experiences, bookings, reviews
- RLS policies; indexes; types generation; seed data
- Files: `supabase/migrations/001_schema.sql`, `supabase/seed.sql`, types in `src/lib/supabase*.ts`

### 6.2 API Routes

- Follow existing route/error patterns
- `/api/experiences`, `/api/guides`, `/api/bookings`, `/api/itineraries` present
- AuthN/Z, rate limiting, TS types, tests

---

## 🎯 Priority 7: Component Library (AFTER P2)

### 7.1 Enhance shadcn/ui

- Preserve structure, a11y, TS interfaces, exports
- Add domain-specific variants (button/card/input/badge/dropdown)
- Backward compatible, documented

### 7.2 Domain Components

- PersonalStories, CommunityShowcase, ExperienceWindows, EmotionalHero, JourneyQuestions, StoryCarousel, CTAButtons
- Accessible, reusable, typed

---

## 🎯 Priority 8: Advanced Features (AFTER P6)

### 8.1 i18n

- Implement complete key coverage in `messages/en.json` and `messages/he.json`
- Language switcher (exists) and locale detection in middleware
- RTL validation across pages

### 8.2 UX Enhancements

- Progressive images, smooth scroll, interactive map, video bg
- Lazy/lite components, skeletons, toasts, modals, form validation

---

## 📊 Success Metrics

### Performance

- Lighthouse > 90
- Bundle < 500KB
- TTI < 3s
- FCP < 1.5s
- CLS < 0.1

### Quality

- Test coverage > 80% (introduce lightweight Vitest + RTL for critical components)
- 0 TypeScript errors
- 0 ESLint warnings
- 0 known vulnerabilities
- 100% accessibility compliance

### Domain KPIs (edit)

- Emotional impact > 8/10
- Warmth perception > 8/10
- Authenticity rating > 9/10
- Cultural sensitivity 100%
- i18n completeness 100%

---

## 📈 Overall Progress

```text
Priority 1: [███████░░░░░░░░░░░░░░] 35% (Foundation)
Priority 2: [███░░░░░░░░░░░░░░░░░░] 15% (New Pages)
Priority 3: [██░░░░░░░░░░░░░░░░░░░] 10% (Auth)
Priority 4: [░░░░░░░░░░░░░░░░░░░░] 0% (Protected)
Priority 5: [░░░░░░░░░░░░░░░░░░░░] 0% (Content)
Priority 6: [██░░░░░░░░░░░░░░░░░░░] 10% (DB/API)
Priority 7: [█░░░░░░░░░░░░░░░░░░░░] 5% (Components)
Priority 8: [█░░░░░░░░░░░░░░░░░░░░] 5% (Advanced)

TOTAL: [█████░░░░░░░░░░░░░░░░] 15% Complete
```

---

## 🚨 Critical Rules

### Structure Preservation

- NEVER change existing file structure
- NEVER delete or move existing files
- ALWAYS work within current tree

### File Modification Rules

- TRANSFORM don’t replace; ENHANCE don’t break
- PRESERVE patterns, interfaces, and types

### Component Patterns

- Follow existing export patterns & Tailwind class conventions
- Maintain props interfaces & a11y attributes

---

## 🎯 Execution Order

1. Priority 1.1 — Landing
2. Priority 1.2 — Root Layout
3. Priority 1.3 — Hero
4. Priority 1.4 — Global Styles
5. Priority 2 — New Pages
6. Priority 3 — Auth
7. Priority 4 — Protected
8. Priority 5 — Content
9. Priority 6 — DB Schema & API
10. Priority 7 — Components
11. Priority 8 — Advanced Features

---

## 🏆 Definition of Done

A task is complete when:

- Code follows existing patterns
- Existing functionality preserved
- Tests written & passing
- Docs updated
- Performance measured
- Accessibility verified
- Cultural sensitivity ensured
- i18n/RTL validated

---

**Last Updated**: 2025-09-15 IST  
**Version**: 0.2.0  
**Status**: READY TO CONTINUE — Priority 1 Foundation  
**Vision**: “Discover Israel through the people who live it” / “לגלות את ישראל דרך האנשים שחיים אותה”

## LionSTour

**Purpose:** An emotional, story-driven tourism platform connecting travelers with authentic Israeli experiences and trusted local guides.

> Global Guardrails (apply to every prompt)
>
> - Tech Stack: Next.js App Router, TypeScript, Tailwind, Supabase, Prisma, Stripe, Mapbox, next-intl
> - Design Principles: Human-first, story-centric, warm visuals, accessibility, performance, multilingual/RTL
> - Content Rules: Authentic stories from locals; trauma-aware; no performative or stocky tone
> - Backend Assumptions: Supabase Auth + Postgres + RLS; Prisma ORM; API routes under `src/app/api/*`
> - Primary CTAs: “Plan Your Journey”, “Explore Experiences”, “Book Now”
> - Performance Budgets: LCP ≤ 2.5s, FCP ≤ 1.5s, CLS < 0.1, TTI ≤ 3s

---

## (public)

### `/experiences` — Experiences Gallery

```json
{
  "role": "feature-implementer",
  "objective": "Narrative experiences with filters, carousel, map, spotlight",
  "context": {
    "route": "/experiences",
    "components": [
      "ExperienceCarousel",
      "StoryFilters",
      "MapView",
      "GuideSpotlight"
    ]
  },
  "files_to_create": ["src/app/experiences/page.tsx"],
  "steps": [
    "Wire `/api/experiences` to gallery and filters",
    "Ensure skeletons and lazy loading for media",
    "Add tracking for CTA clicks"
  ],
  "acceptance_criteria": [
    "FCP < 2s on mid-tier device",
    "Filters update carousel and map without full reload"
  ],
  "constraints": ["No breaking changes to exports", "Preserve RTL"],
  "testing": ["Basic render and filter interaction test"],
  "progress_report": "src/app/_reports/experiences.PROGRESS.md"
}
```

### `/enterprise` — Enterprise Landing (public overview)

```json
{
  "role": "feature-implementer",
  "objective": "Showcase partner value, tiers, inquiry form",
  "context": { "route": "/enterprise" },
  "files_to_create": ["src/app/enterprise/page.tsx"],
  "steps": [
    "Design sections and CTAs",
    "Implement static content with i18n",
    "Hook `/api/enterprise/partner`"
  ],
  "acceptance_criteria": [
    "Form stores inquiries",
    "Content is accessible (WCAG AA)"
  ],
  "constraints": ["No new global styles"],
  "testing": ["Form submit success + error paths"],
  "progress_report": "src/app/_reports/enterprise.PROGRESS.md"
}
```

---

## (auth)

### `/auth/login` — Authentication

```json
{
  "role": "auth-integrator",
  "objective": "Ensure password, magic link, and OAuth flows",
  "context": { "route": "/auth/login" },
  "files_to_create": ["src/app/auth/login/page.tsx"],
  "steps": [
    "Connect Supabase methods",
    "Polish messages and errors",
    "Add redirects"
  ],
  "acceptance_criteria": [
    "Magic link email sent",
    "OAuth redirects to dashboard"
  ],
  "constraints": ["Client-only auth in this phase"],
  "testing": ["Mock Supabase and test flows"],
  "progress_report": "src/app/_reports/auth-login.PROGRESS.md"
}
```

---

## (dashboard)

### `/dashboard` — User Dashboard

```json
{
  "role": "dashboard-implementer",
  "objective": "Bookings, favorites, upcoming, profile",
  "context": {
    "route": "/dashboard",
    "components": [
      "booking-list",
      "profile-settings",
      "journey-history",
      "favorite-guides"
    ]
  },
  "files_to_create": ["src/app/dashboard/page.tsx"],
  "steps": [
    "SSR user session (later)",
    "Client fetch bookings",
    "Profile edit form"
  ],
  "acceptance_criteria": ["Lists render for logged-in user", "Edits persist"],
  "constraints": ["Respect RLS", "No server secrets on client"],
  "testing": ["Route guards and 401 redirects"],
  "progress_report": "src/app/_reports/dashboard.PROGRESS.md"
}
```

### `/dashboard/tools/impact` — Impact Transparency Tool

```json
{
  "role": "tool-builder",
  "objective": "Show impact metrics by region and bookings",
  "context": { "route": "/dashboard/tools/impact", "components": ["impact"] },
  "files_to_create": ["src/app/dashboard/tools/impact/page.tsx"],
  "steps": ["Use `/api/impact`", "Charts and summaries", "Empty state"],
  "acceptance_criteria": [
    "No data shows empty state",
    "Chart updates with filters"
  ],
  "constraints": ["Client-only charts"],
  "testing": ["Snapshot and data fetch mock"],
  "progress_report": "src/app/_reports/impact.PROGRESS.md"
}
```

---

## (academy)

### `/academy` — Academy Index

```json
{
  "role": "content-implementer",
  "objective": "Educational content hub with topics and featured story",
  "context": { "route": "/academy" },
  "files_to_create": ["src/app/academy/page.tsx"],
  "steps": [
    "Render topics from i18n",
    "Add search/filter (client)",
    "Link to [slug]"
  ],
  "acceptance_criteria": ["Accessible article cards", "SEO tags present"],
  "constraints": ["Use existing styles"],
  "testing": ["Render smoke test"],
  "progress_report": "src/app/_reports/academy.PROGRESS.md"
}
```

### `/academy/[slug]` — Article Detail

```json
{
  "role": "content-implementer",
  "objective": "Render article content from API or static source",
  "context": { "route": "/academy/[slug]" },
  "files_to_create": ["src/app/academy/[slug]/page.tsx"],
  "steps": [
    "Fetch content by slug",
    "Render with accessible headings",
    "Add next/prev links"
  ],
  "acceptance_criteria": ["WCAG AA", "Shareable metadata"],
  "constraints": ["Client fetch for now"],
  "testing": ["Slug render smoke test"],
  "progress_report": "src/app/_reports/article.PROGRESS.md"
}
```

---

## (trust)

### `/trust/safety` — Trust & Safety

```json
{
  "role": "trust-owner",
  "objective": "Clear safety standards, emergency contacts, trust indicators",
  "context": { "route": "/trust/safety" },
  "files_to_create": ["src/app/trust/safety/page.tsx"],
  "steps": [
    "Draft content and i18n keys",
    "Add SOS and multilingual contacts",
    "Link to policies"
  ],
  "acceptance_criteria": [
    "Content clear and culturally sensitive",
    "Accessible and responsive"
  ],
  "constraints": ["Static content first"],
  "testing": ["Accessibility check"],
  "progress_report": "src/app/_reports/trust-safety.PROGRESS.md"
}
```

---

## (enterprise)

### `/enterprise` — Enterprise Landing (full page)

```json
{
  "role": "enterprise-owner",
  "objective": "Partner value, tiers, inquiry form stored in DB",
  "context": { "route": "/enterprise" },
  "files_to_create": ["src/app/enterprise/page.tsx"],
  "steps": [
    "Compose sections",
    "Inquiry form hooks to API",
    "Add success stories"
  ],
  "acceptance_criteria": ["Form persists", "SEO meta present"],
  "constraints": ["No external CMS yet"],
  "testing": ["API integration mocked"],
  "progress_report": "src/app/_reports/enterprise.PROGRESS.md"
}
```

---

## Shared Layouts & Metadata

### Group `layout.tsx` per segment

```json
{
  "role": "layout-owner",
  "objective": "Shared layouts per route group",
  "context": {
    "targets": [
      "(public)",
      "(auth)",
      "(dashboard)",
      "(academy)",
      "(trust)",
      "(enterprise)"
    ]
  },
  "files_to_create": ["src/app/(public)/layout.tsx", "..."],
  "steps": [
    "Create minimal wrappers",
    "Include localized head",
    "Verify slot rendering"
  ],
  "acceptance_criteria": [
    "No layout regressions",
    "Proper metadata inheritance"
  ],
  "constraints": ["No global state in group layouts"],
  "testing": ["Render children smoke tests"],
  "progress_report": "src/app/_reports/layouts.PROGRESS.md"
}
```

---

## Root & Platform

### Root layout

```json
{
  "role": "platform-owner",
  "objective": "Root HTML shell, fonts, providers, metadata",
  "context": { "file": "src/app/layout.tsx" },
  "files_to_create": ["src/app/layout.tsx", "src/app/globals.css"],
  "steps": [
    "Ensure RTL+lang handling",
    "Include i18n provider",
    "Metadata polish"
  ],
  "acceptance_criteria": ["No hydration errors", "Fonts render correctly"],
  "constraints": ["No blocking scripts"],
  "testing": ["Lighthouse pass > 90"],
  "progress_report": "src/app/_reports/root-layout.PROGRESS.md"
}
```

### Providers

```json
{
  "role": "platform-owner",
  "objective": "App-level providers and context setup",
  "context": { "file": "src/app/providers.tsx" },
  "files_to_create": ["src/app/providers.tsx"],
  "steps": [
    "Extract providers from layout",
    "Expose typed hooks",
    "Document usage"
  ],
  "acceptance_criteria": ["Tree-shakeable", "No client/server mismatch"],
  "constraints": ["Keep minimal"],
  "testing": ["SSR/CSR render parity"],
  "progress_report": "src/app/_reports/providers.PROGRESS.md"
}
```

### Middleware (i18n / routing)

```json
{
  "role": "platform-owner",
  "objective": "Locale detection, redirects if needed",
  "context": { "file": "src/middleware.ts" },
  "files_to_create": ["src/middleware.ts"],
  "steps": ["Implement locale detection", "Preserve static routes", "Skip API"],
  "acceptance_criteria": ["No infinite redirects", "Respects query params"],
  "constraints": ["Edge-safe"],
  "testing": ["Unit for matcher"],
  "progress_report": "src/app/_reports/middleware.PROGRESS.md"
}
```

### i18n Helpers

```json
{
  "role": "platform-owner",
  "objective": "Centralize i18n configuration and helpers",
  "context": { "dir": "src/lib/i18n" },
  "files_to_create": ["src/lib/i18n/config.ts", "src/lib/i18n/index.ts"],
  "steps": [
    "Export supported locales",
    "Helper for t() with types",
    "SSR-friendly APIs"
  ],
  "acceptance_criteria": ["Typed keys", "No runtime locale errors"],
  "constraints": ["No heavy deps"],
  "testing": ["Type-level key safety"],
  "progress_report": "src/app/_reports/i18n.PROGRESS.md"
}
```

### Telemetry Utility

```json
{
  "role": "platform-owner",
  "objective": "App telemetry helpers and no-op in dev",
  "context": { "file": "src/lib/telemetry.ts" },
  "files_to_create": ["src/lib/telemetry.ts"],
  "steps": [
    "Wrap OpenTelemetry hooks",
    "Expose simple log/trace API",
    "Guard for browser"
  ],
  "acceptance_criteria": ["No crashes without env"],
  "constraints": ["Tree-shakeable"],
  "testing": ["Unit test no-op"],
  "progress_report": "src/app/_reports/telemetry.PROGRESS.md"
}
```

### Instrumentation Stub

```json
{
  "role": "platform-owner",
  "objective": "Provide hooks for OpenTelemetry in Next.js",
  "context": { "file": "instrumentation.ts" },
  "files_to_create": ["instrumentation.ts"],
  "steps": ["Init OTEL if env present", "No-op otherwise", "Document"],
  "acceptance_criteria": ["Build doesn't fail without env"],
  "constraints": ["No secrets client-side"],
  "testing": ["Smoke build"],
  "progress_report": "src/app/_reports/instrumentation.PROGRESS.md"
}
```

### Styling / Design System Config

```json
{
  "role": "design-system-owner",
  "objective": "Tailwind tokens and theming",
  "context": { "file": "tailwind.config.js" },
  "files_to_create": ["tailwind.config.ts"],
  "steps": [
    "Add brand palette tokens",
    "Ensure RTL utilities",
    "Document usage"
  ],
  "acceptance_criteria": ["No class name breaks", "Tokens available in CSS"],
  "constraints": ["No breaking changes"],
  "testing": ["Type-check config"],
  "progress_report": "src/app/_reports/tailwind.PROGRESS.md"
}
```

### Testing & CI

```json
{
  "role": "platform-owner",
  "objective": "Smoke/e2e checks and budgets in CI",
  "context": { "dir": "." },
  "files_to_create": [
    "e2e/smoke.spec.ts",
    "e2e/accessibility.spec.ts",
    "performance-budgets.json",
    ".github/workflows/ci.yml"
  ],
  "steps": [
    "Add Playwright smoke and a11y checks",
    "Add budgets file",
    "Setup CI"
  ],
  "acceptance_criteria": ["CI green", "Budgets enforced"],
  "constraints": ["Node 20, pnpm 9"],
  "testing": ["Playwright run on PR"],
  "progress_report": "src/app/_reports/ci.PROGRESS.md"
}
```

### Agent Runbook / README

```json
{
  "role": "platform-owner",
  "objective": "Runbook for agents and contributors",
  "context": { "file": "AGENT_README.md" },
  "files_to_create": ["AGENT_README.md"],
  "steps": [
    "Document local setup",
    "Add task conventions",
    "Add deployment notes"
  ],
  "acceptance_criteria": ["New contributor can run dev in < 5 min"],
  "constraints": ["Keep concise"],
  "testing": ["Manual walkthrough"],
  "progress_report": "src/app/_reports/readme.PROGRESS.md"
}
```

---

### Notes for Handoff

- Each JSON block is self-contained.
- Replace placeholder tokens (e.g. {{TOKEN_NAME}}) with concrete values.
- Keep interface contracts stable when moving from mock to real services.
- Co-locate i18n keys near page-level `_content/` directories.

---

## Optional Additional Sections

- {{DATA_LAYER_SECTION}}
- {{FEATURE_FLAGS_SECTION}}
- {{ACCESSIBILITY_AUDIT_SECTION}}
- {{SECURITY_REVIEW_SECTION}}

---

## Change Log (Template)

| Date           | Change               | Owner     |
| -------------- | -------------------- | --------- |
| {{YYYY_MM_DD}} | {{INITIAL_SCAFFOLD}} | {{OWNER}} |
| {{YYYY_MM_DD}} | {{REFINEMENT}}       | {{OWNER}} |
