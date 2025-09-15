#!/usr/bin/env bash
set -euo pipefail

echo "[env-boot] Verifying environment and tooling..."

# Node version
NODE_V=$(node -v 2>/dev/null || echo "v0.0.0")
NODE_MAJ=${NODE_V#v}; NODE_MAJ=${NODE_MAJ%%.*}
if [[ ${NODE_MAJ:-0} -lt 20 ]]; then
  echo "[env-boot] WARNING: Node ${NODE_V} detected. Please use Node >= 20."
else
  echo "[env-boot] Node ${NODE_V} ✅"
fi

# pnpm version
if command -v pnpm >/dev/null 2>&1; then
  PNPM_V=$(pnpm -v)
  echo "[env-boot] pnpm ${PNPM_V} ✅"
else
  echo "[env-boot] ERROR: pnpm is not installed. Install pnpm 9.x." >&2
  exit 1
fi

# Prisma versions alignment (client vs CLI)
PRISMA_CLIENT_V=$(node -p "require('@prisma/client/package.json').version" 2>/dev/null || echo "")
PRISMA_CLI_V=$(node -p "require('prisma/package.json').version" 2>/dev/null || echo "")
if [[ -n "${PRISMA_CLIENT_V}" && -n "${PRISMA_CLI_V}" ]]; then
  if [[ "${PRISMA_CLIENT_V}" != "${PRISMA_CLI_V}" ]]; then
    echo "[env-boot] Aligning prisma CLI (${PRISMA_CLI_V}) -> @prisma/client (${PRISMA_CLIENT_V})"
    pnpm add -D prisma@"${PRISMA_CLIENT_V}" || echo "[env-boot] WARN: Failed to auto-align prisma CLI; please run: pnpm add -D prisma@${PRISMA_CLIENT_V}"
  else
    echo "[env-boot] Prisma versions aligned (${PRISMA_CLIENT_V}) ✅"
  fi
else
  echo "[env-boot] Skipping Prisma version check (packages not yet installed)"
fi

# Ensure Prisma Client is generated (Accelerate, no engine)
echo "[env-boot] Generating Prisma Client..."
pnpm run -s db:generate || npx prisma generate --no-engine || true

# Accelerate URL check (non-fatal)
if [[ -n "${DATABASE_URL:-}" ]]; then
  if ! [[ "${DATABASE_URL}" =~ ^prisma\+postgres:// ]]; then
    echo "[env-boot] WARNING: DATABASE_URL is not Accelerate format (prisma+postgres://...)."
  fi
else
  echo "[env-boot] NOTE: DATABASE_URL is not set in env; skipping check."
fi

# Fast safety gate
echo "[env-boot] Running type-check..."
pnpm run -s type-check || true

echo "[env-boot] Done. You can run 'pnpm dev' to start the app."

