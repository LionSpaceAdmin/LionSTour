# Repository Guidelines

This repo is a Next.js 15 (App Router) + React 19 project with Tailwind CSS v4, Prisma (Accelerate), and Supabase. Use pnpm 9 and Node 20.

## Project Structure & Module Organization
- App: `src/app` (pages, layouts, API under `src/app/api/*/route.ts`).
- UI: `src/components` (PascalCase), primitives in `src/components/ui`.
- Core: `src/lib` (Prisma, Supabase, Stripe, Mapbox, utils, types), hooks in `src/hooks`.
- Data: `prisma/` (schema, seed). Assets: `public/`. Locales: `messages/`.
- Tooling: `.mcp/` (MCP server configs: filesystem, git, postgres). Scripts: `scripts/` (dev/DB helpers). E2E: `e2e/` (Playwright).

## Build, Test, and Development Commands
- `pnpm dev` — run locally at `http://localhost:3000`.
- `pnpm build` / `pnpm start` — production build and serve.
- `pnpm lint` / `pnpm type-check` — ESLint + TypeScript checks.
- `pnpm test` — Playwright E2E; `pnpm test:unit` — Vitest unit tests.
- `pnpm db:generate|db:migrate|db:studio|db:seed` — Prisma tasks.
- `./scripts/db.sh migrate|studio|reset` — convenience DB commands.

## Coding Style & Naming Conventions
- TypeScript‑first; follow ESLint (`next/core-web-vitals`, `next/typescript`). Prefer fixing rules over disabling.
- Components: PascalCase (e.g., `GuideSpotlight.tsx`). Hooks: `useName.ts(x)`.
- Routes/API folders: kebab-case (e.g., `src/app/trust/safety/page.tsx`).
- Utilities/types: camelCase; shared types in `src/lib/types.ts`.
- Fonts/Images: use `next/font` (Heebo) and `next/image` with `sizes`/`fill` where applicable.

## Testing Guidelines
- Unit: Vitest + Testing Library. Name tests `*.test.ts(x)` colocated or under `__tests__/`.
- E2E: Playwright specs live in `e2e/`; keep tests reliable and fast.
- Minimum gate before PR: `pnpm type-check && pnpm lint && pnpm build` (run tests when changed).

## Commit & Pull Request Guidelines
- Commits: imperative, present tense; subject ≤ 72 chars. Example: `components: add MapView with clustered markers`.
- PRs: concise description, scope, setup notes, and UI screenshots. Link issues (e.g., `Closes #123`). Ensure CI (Node 20, pnpm 9) is green.

## Security & Configuration Tips
- Required env: `DATABASE_URL`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Never commit secrets or `.env`. Use a safe local DB for Prisma.

## Agent-Specific Instructions
- Do not edit generated folders (`.next/`, `node_modules/`). Keep patches minimal and scoped.
- For Prisma schema changes, include a migration. Validate with `pnpm type-check`, `pnpm lint`, `pnpm build`.
- Prisma uses Edge client with Accelerate; ensure `DATABASE_URL` uses `prisma+postgres://...` in local/CI envs.
