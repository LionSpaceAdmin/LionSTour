# Prototype Alignment Audit — LionSTour

Source: `noetodo.md` (treated as source of truth)
Legend: ✅ implemented | 🔄 partial | ❌ missing

## Priority 1 — Foundation

### 1.1 Landing Page
- ✅ Replace title/subtitle + CTA flow
- ✅ Transform Hero to cinematic EmotionalHero with video + dark overlay
- ✅ Add PersonalStories, CommunityShowcase, ExperienceWindows (preview)
- ✅ Maintain responsive layout patterns
- 🔄 Preserve Auth/Theme: Auth present; custom i18n switcher used (no theme switch)
- 🔄 QA (perf): pending explicit 3G test

### 1.2 Root Layout
- ✅ Hebrew `lang="he"` + RTL wrapper via i18n provider
- ✅ Tourism metadata + SEO fields
- 🔄 Supabase provider: using client/server helpers; no global provider wrapper

### 1.3 Hero Component
- ✅ Emotional copy + bold hierarchy; background video integrated
- ✅ Prominent CTAs to plan/experiences
- 🔄 A11y audit: basic contrast ok; full pass pending

### 1.4 Global Styles
- ✅ Custom palette + animations and buttons
- 🔄 Final color overhaul in all pages pending (removing soft/beige everywhere)

## Priority 2 — Pages

### 2.1 Experiences
- ✅ Page scaffolded + story filters + map + spotlight
- ✅ Featured (“Experience of the Week”) backed by schema
- ✅ Replaced static grid with cinematic Narrative Carousel (snap-x, overflow)
- 🔄 Performance/FCP: pending measurement

### 2.2 Guides
- ✅ Dynamic guide page with personal story, timeline, calendar, testimonials, community
- 🔄 Asset curation and <2s perf pending

### 2.3 Plan
- ✅ Questionnaire, AI-authored itinerary, guide matching, previews, sharing, reflection
- ✅ Prefill from `?prompt=` and regenerate with seed
- 🔄 Narrative QA and PDF export pending

## Priority 3 — Auth
- ✅ Login with Supabase + magic link + OAuth (Google/Facebook)
- ✅ Sign up flow connected
- 🔄 Full flow verification across providers pending

## Priority 5 — Content
- ✅ Academy page with listing, filters, search; Supabase backing
- ✅ Trust & Safety page with content, contacts, indicators
- ✅ Enterprise page with partner form + API + admin gating
- 🔄 Enterprise: add more success stories/benefits blocks

## Priority 6 — DB / API
- ✅ Supabase schema + RLS + indices; Prisma schema aligned
- ✅ Experiences/Guides/Bookings/Itineraries APIs with rate limiting
- 🔄 Error normalization + exhaustive typing pending

---

## First Batch of Fixes (this pass)
1) Cinematic video overlay + refactored Hero (src/components/VideoBackground.tsx, src/components/hero.tsx) — ✅
2) Narrative ExperienceCarousel (src/components/ExperienceCarousel.tsx) + integration on /experiences — ✅
3) AI itinerary generation with prompt + regenerate seed (src/app/api/itineraries/route.ts, src/app/plan/page.tsx) — ✅

## Next Candidates
- Planner overlay on Home (action-first), scroll-triggered narrative scenes
- Framer Motion for staggered cards + parallax cues
- Replace remaining soft gradients with overlays where needed

