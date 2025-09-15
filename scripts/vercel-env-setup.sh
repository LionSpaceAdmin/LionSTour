#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/vercel-env-setup.sh \
#     --project <project-name-or-id> \
#     --org <org-id> \
#     --token <vercel-token> \
#     [--environment production|preview|development] \
#     --env KEY=VALUE [--env KEY=VALUE ...]
# Requires: Vercel CLI logged in or token provided.

usage() {
  cat <<EOF
Usage: $0 --project <project> --org <org_id> --token <token> [--environment production|preview|development] --env KEY=VALUE [--env KEY=VALUE ...]

Sets environment variables in Vercel for the specified project.
Uses non-interactive mode to avoid prompts.
Defaults to --environment production.

Example:
  $0 --project prj_abc123 --org org_abc123 --token xxx \
     --environment production \
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
ENVIRONMENT="production"
ENVS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project)
      PROJECT="$2"; shift 2;;
    --org)
      ORG="$2"; shift 2;;
    --token)
      TOKEN="$2"; shift 2;;
    --environment)
      ENVIRONMENT="$2"; shift 2;;
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

case "$ENVIRONMENT" in
  production|preview|development) ;;
  *) echo "Invalid --environment: $ENVIRONMENT (use production|preview|development)" >&2; exit 1;;
esac

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required (Node.js)." >&2
  exit 1
fi

if [[ ${#ENVS[@]} -eq 0 ]]; then
  echo "No --env KEY=VALUE provided; nothing to set." >&2
  exit 1
fi

for kv in "${ENVS[@]}"; do
  KEY=${kv%%=*}
  VAL=${kv#*=}
  echo "Setting $KEY for $ENVIRONMENT ..."
  printf "%s" "$VAL" | npx vercel env add "$KEY" "$ENVIRONMENT" \
    --token "$TOKEN" \
    --scope "$ORG" \
    --project "$PROJECT" >/dev/null
  echo "✔ $KEY set"
done

echo "All env vars set for $ENVIRONMENT."