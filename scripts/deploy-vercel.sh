#!/usr/bin/env bash
set -euo pipefail

# Simple, non-interactive Vercel deploy helper.
# Requires: VERCEL_TOKEN env var, .vercel/project.json present.
# Optional: VERCEL_ORG_ID/VERCEL_PROJECT_ID (vercel pull can infer from .vercel/project.json)

if ! command -v npx >/dev/null 2>&1; then
  echo "[deploy] npx is required" >&2
  exit 1
fi

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "[deploy] Please export VERCEL_TOKEN first (Project or Personal token)" >&2
  exit 1
fi

echo "[deploy] Pulling Production env..."
npx vercel pull --yes --environment=production --token "$VERCEL_TOKEN"

echo "[deploy] Building (production)..."
npx vercel build --prod --token "$VERCEL_TOKEN"

echo "[deploy] Deploying prebuilt output to Production..."
npx vercel deploy --prebuilt --prod --token "$VERCEL_TOKEN"

echo "[deploy] Done."

