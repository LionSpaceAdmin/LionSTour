# Architecture Overview and UI/Perf Checklist

This document provides a lightweight map of the platform’s end‑to‑end architecture plus a practical UI/Performance checklist for daily work.

## Architecture Overview
- Edge/CDN: Vercel Edge for caching, middleware and fast global delivery.
- Frontend: Next.js App Router (React 19) served by Vercel; planned mobile client (React Native).
- API/Gateway: Backend API and AI Gateway coordinate business rules and model calls (HTTP/JSON). Scheduled collectors handle OSINT‑style jobs.
- Data: Primary application data in managed stores (e.g., Firestore/Storage; BigQuery planned for analytics).
- AI: Gateway or orchestrator that fans out to Gemini and specialized models.
- Ops: GitHub Actions for CI/CD, central logging/metrics for monitoring.

Diagram page
- An interactive diagram is available at the app route `/archit` (renders columns for Users → Edge → Frontend → Backend → Data → AI → Ops with SVG connectors).

## UI/Performance Checklist
- Use `next/font` (Heebo) and `next/image` with `sizes`/`fill` and blur placeholders where possible.
- Split heavy components with `next/dynamic`; prefer skeletons over spinners; respect `prefers-reduced-motion`.
- Keep LCP media optimized: preload critical poster images; use `preload`/`prefetch` sparingly.
- Maintain accessible nav: `aria-label`, `aria-expanded`, focus rings; include “skip to content”.
- Minimize client state; prefer Server Components where feasible; memoize expensive lists.
- Network: cache GETs, debounce searches, stream progressively when applicable.
- Budget targets: LCP < 2.5s, CLS < 0.1, route bundle ≤ 200KB.

Notes
- Secrets are never committed. Env vars are provided via Vercel/Supabase envs locally and in CI.
- Keep changes small and reversible; add short design notes in PR description when touching shared UI.
