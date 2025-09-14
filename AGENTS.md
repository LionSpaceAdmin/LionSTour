# Repository Guidelines

## Project Structure & Module Organization
- App Router: `src/app` (pages, layouts, API routes under `src/app/api/*/route.ts`).
- UI: `src/components` (PascalCase `.tsx` components), `src/components/ui` for primitives.
- Core libs: `src/lib` (Prisma, Supabase, Stripe, Mapbox, utilities, types), hooks in `src/hooks`.
- Data layer: Prisma schema and seed in `prisma/`.
- Assets: `public/`. Locales: `messages/` (used with `next-intl`).
- Scripts: `scripts/` helpers for dev and DB tasks.

## Build, Test, and Development Commands
- `pnpm dev` — run Next.js locally at `http://localhost:3000`.
- `pnpm build` / `pnpm start` — production build and serve.
- `pnpm lint` / `pnpm type-check` — ESLint and TypeScript checks.
- `pnpm db:generate` / `pnpm db:migrate` / `pnpm db:seed` — Prisma client, migrations, seed.
- `./scripts/db.sh migrate|studio|reset` — convenience DB commands.

## Coding Style & Naming Conventions
- TypeScript-first. Follow ESLint config (`next/core-web-vitals`, `next/typescript`). Fix/clarify lint issues rather than disabling rules.
- Components: PascalCase filenames in `src/components` (e.g., `GuideSpotlight.tsx`). Hooks: `useName.ts(x)`.
- Route segments and API folders: kebab-case (e.g., `src/app/trust/safety/page.tsx`).
- Utilities/types: camelCase functions; types/interfaces in `src/lib/types.ts`.

## Testing Guidelines
- No formal test suite yet. For new code, prefer small, focused tests (suggested stack: Vitest + Testing Library).
- Name tests `*.test.ts(x)` colocated with source or under `__tests__/`.
- Minimum: ensure `pnpm type-check && pnpm lint && pnpm build` pass before opening a PR.

## Commit & Pull Request Guidelines
- Commits: imperative, present tense; concise subject (<= 72 chars), details in body. Example: `components: add MapView with clustered markers`.
- PRs: clear description, scope of change, setup notes, and screenshots for UI. Reference issues (`Closes #123`). Ensure CI (Node 20, pnpm 9) is green.

## Security & Configuration Tips
- Required env: `DATABASE_URL`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Do not commit secrets or `.env`. Run Prisma against a safe DB locally.

## Agent-Specific Instructions
- Do not edit generated folders (`.next/`, `node_modules/`).
- Prefer minimal, surgical changes aligned with this structure. For schema updates, include a Prisma migration.
- Validate locally with `pnpm type-check`, `pnpm lint`, `pnpm build` before proposing changes.
