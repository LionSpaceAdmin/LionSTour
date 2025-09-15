# TODO — Project Tracker

> Working tracker for LionSTour (Next.js 15 + React 19 + Tailwind v4 + Prisma + Supabase). Keep items actionable and short. One H1 only.

## 🔼 Now (Top Priorities)

- [x] Landing polish: copy, i18n keys, hero perf
- [x] Experiences page: filters + map wiring
- [ ] CI env hardening (no `.env.example` dependency)

##  Roadmap & Milestones

- [x] M1 — Foundation (routing, styles, i18n, env) — Target: Sept
- [x] M2 — Experiences + Guides (gallery, profiles) — Target: Oct
- [ ] M3 — Planner + Bookings MVP (flows, API) — Target: Nov
- [ ] M4 — Dashboard (profile, history) — Target: Dec

### EPIC: Full Multilingual (i18n) Rollout

Objective: Provide complete end-to-end multilingual support (EN/HE initially; scalable to more), from routing and middleware to content, components, metadata, and data, using the smartest approach for our stack (Next.js App Router + next-intl), with RTL-first fidelity.

Scope:

- App Router locale routing with middleware detection and negotiation
- Shared translation management with `next-intl` (messages/en.json, messages/he.json)
- Static and dynamic metadata localization (title, description, OG/Twitter)
- Component-level i18n (strings, dates, numbers, plurals, relative time)
- RTL/LTR strategy (dir, logical CSS, Tailwind RTL utilities) and layout mirroring
- Forms, validation messages, and toasts localized
- URL structure and canonical/alternate links for SEO
- Data-layer awareness (storing locale, user preferences)
- Analytics segmentation by locale

Approach & Tech:

- Use `next-intl` v3+ with App Router (server + client components)
- Locale segments: `/(en)`, `/(he)` with middleware-driven default
- `src/middleware.ts`: accept `Accept-Language`, cookie `NEXT_LOCALE`, path prefix
- Provide `I18nProvider` at root layout with messages loading per locale
- Tailwind RTL: rely on logical properties in CSS and `dir` attribute; add RTL-safe utilities where needed
- Type-safe message keys with helper typings

Deliverables:

- Locale routing and detection implemented in `middleware.ts` and `src/app/*`
- [x] Complete key coverage in `messages/en.json` and `messages/he.json` (0 missing keys)
- [x] Localized metadata via `generateMetadata` in all pages
- [x] Components audited: hero, stories, experiences, guides, planner, auth
- [ ] RTL verification across core views; visual diffs captured
- [ ] E2E smoke flows for both locales (navigation, auth, planner happy path)
- [ ] Docs: i18n contribution guide (adding keys, reviewing translations)

Acceptance Criteria:

- Visiting `/` sets locale via negotiation and redirects/prefers saved cookie
- Switching language preserves route and state where feasible
- All static copy localized; no English fallbacks in HE (and vice versa)
- A11y preserved (aria-labels, alt text, titles localized)
- SEO: `hreflang`, canonical, and sitemaps include locale variants
- LTR/RTL spacing, alignment, and icons visually correct

Rollout Plan:

1. Foundation: routing, provider, middleware, baseline messages
2. Core pages: Home, Experiences, Guides
3. Flows: Auth, Planner
4. Dashboard surfaces (as they land)
5. SEO & sitemaps + analytics locale segmentation
6. QA sweep and visual checks; address regressions

Risks & Mitigations:

- Incomplete key coverage → CI check for missing keys
- RTL regressions → add targeted visual tests/checklist
- SEO misconfiguration → verify with `hreflang` validator and Search Console

## 🧩 Features

### Public Site

- [x] Home: emotional hero, stories, windows preview complete
- [x] Experiences: story filters, carousel, map view toggle
- [x] Guides: spotlight section, profile deep-dive

### Auth & Users

- [x] Supabase Auth flows (login/signup), redirects, error states
- [ ] Profile settings (name, locale, preferences)

### Planner & Bookings

- [x] AI planner integration and itinerary draft
- [ ] Booking list + availability calendar

## 🗺️ Internationalization (i18n)

- [x] Ensure key coverage: `messages/en.json`, `messages/he.json`
- [ ] RTL validation across components and pages
- [ ] Middleware locale detection sanity check

## 🛠️ Platform / DX

- [ ] Type-checks green (`pnpm type-check`)
- [ ] Lint clean (`pnpm lint`)
- [ ] Build passes (`pnpm build`)
- [x] Minimal Vitest + RTL smoke tests added

## 🌐 Deployment & Envs

- [ ] Env vars defined and documented (Stripe, Mapbox, Supabase)
- [ ] CI/CD green on `main` (GitHub Actions)
- [ ] Vercel production deploy + post-deploy smoke test

## 🔒 Data & API

- [ ] Prisma schema verified; migrations applied
- [ ] RLS policies audited; seed data validated
- [ ] API routes: experiences, guides, bookings, itineraries

## 📈 Quality & Performance

- [ ] Lighthouse ≥ 90; LCP ≤ 2.5s; CLS ≤ 0.1
- [ ] A11y sweep (WCAG 2.1 AA) on key flows
- [ ] Bundle size budget enforced (< 500KB initial)

## 🧪 QA & Smoke Tests

- [x] Home renders, links/CTAs function
- [x] Experiences list + filter interactions
- [x] Auth happy path + error handling

## 🧯 Risks & Follow-ups

- [ ] Stripe test mode vs production keys parity
- [ ] Mapbox token scoping
- [ ] Rate limiting on public endpoints

## 📝 Notes

<!-- Freeform notes, decisions, and links go here. -->