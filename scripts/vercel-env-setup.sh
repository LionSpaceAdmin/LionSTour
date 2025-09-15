#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/vercel-env-setup.sh \
#     --project <project-name-or-id> \
#     --org <org-id> \
#     --token <vercel-token> \
#     --env DATABASE_URL=... \
#     --env STRIPE_SECRET_KEY=... \
#     --env NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=... \
#     --env NEXT_PUBLIC_SUPABASE_URL=... \
#     --env NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# Requires: Vercel CLI logged in or token provided.

usage() {
  cat <<EOF
Usage: $0 --project <project> --org <org_id> --token <token> --env KEY=VALUE [--env KEY=VALUE ...]

Sets environment variables in Vercel (Production) for the specified project.
Uses non-interactive mode to avoid prompts.

Example:
  $0 --project prj_abc123 --org org_abc123 --token xxx \
     --env DATABASE_URL=postgres://... \
     --env STRIPE_SECRET_KEY=sk_live_... \
     --env NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk. ... \
     --env NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co \
     --env NEXT_PUBLIC_SUPABASE_ANON_KEY=...
EOF
}

PROJECT=""
ORG=""
TOKEN=""
ENVS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project)
      PROJECT="$2"; shift 2;;
    --org)
      ORG="$2"; shift 2;;
    --token)
      TOKEN="$2"; shift 2;;
    --env)
      ENVS+=("$2"); shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      echo "Unknown arg: $1"; usage; exit 1;;
  esac
done

if [[ -z "$PROJECT" || -z "$ORG" || -z "$TOKEN" ]]; then
  echo "Missing required arguments" >&2
  usage
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required (Node.js)." >&2
  exit 1
fi

if [[ ${#ENVS[@]} -eq 0 ]]; then
  echo "No --env KEY=VALUE provided; nothing to set." >&2
  exit 1
fi

# Create a temporary .env.production file to use with `vercel env pull` if needed
TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT

for kv in "${ENVS[@]}"; do
  KEY=${kv%%=*}
  VAL=${kv#*=}
  echo "Setting $KEY ..."
  # Use the non-interactive API for Vercel env add
  # Note: vercel env add KEY VALUE production is available in newer CLI via `--dotenv` style; fallback to piping
  printf "%s" "$VAL" | npx vercel env add "$KEY" production \
    --token "$TOKEN" \
    --yes \
    --scope "$ORG" \
    --project "$PROJECT" >/dev/null
  echo "✔ $KEY set"
done

echo "All env vars set for Production."