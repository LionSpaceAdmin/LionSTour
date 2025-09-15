Impact Transparency MVP — Progress Report

Status: Completed (MVP)

What’s included
- API: GET /api/impact aggregates Supabase bookings (fallback to sample) into total + per-location breakdown.
- Lib: src/lib/impact.ts with calculateImpact() and loadImpactReport().
- UI: src/components/impact/ImpactDashboard.tsx accessible, mobile-first, no chart libs.
- Page: /impact SSR page rendering live report.
- i18n: Added Impact.* keys to messages/en.json and messages/he.json.

Assumptions
- Impact share assumed 15% of booking totalPrice.
- Breakdown by experiences.location if available.

Next suggestions
- Persist Impact snapshots daily for trend lines.
- Add region filter + time range on /impact.
- Wire Stripe Webhook to attribute impact on payment confirmation.
