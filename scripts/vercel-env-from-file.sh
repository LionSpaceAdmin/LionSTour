#!/usr/bin/env bash
set -euo pipefail

# Read env vars from a file and set them in Vercel (selected environment) non-interactively.
# Usage:
#   ./scripts/vercel-env-from-file.sh \
#     --project <project-id-or-name> \
#     --org <org-id> \
#     --token <vercel-token> \
#     --env-file <path-to-env-file> \
#     [--environment production|preview|development] \
#     [--keys KEY1,KEY2,...]   # optional: limit to specific keys
#
# Defaults keys (if --keys not provided):
#   DATABASE_URL,STRIPE_SECRET_KEY,NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY

usage() {
  cat <<EOF
Usage: $0 --project <project> --org <org_id> --token <token> --env-file <path> [--keys KEY1,KEY2,...]

Reads variables from the given .env file and configures them in Vercel non-interactively for the selected environment.
EOF
}

PROJECT=""
ORG=""
TOKEN=""
ENV_FILE=""
KEYS_ARG=""
ENVIRONMENT="production"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project) PROJECT="$2"; shift 2;;
    --org) ORG="$2"; shift 2;;
    --token) TOKEN="$2"; shift 2;;
    --env-file) ENV_FILE="$2"; shift 2;;
  --keys) KEYS_ARG="$2"; shift 2;;
  --environment) ENVIRONMENT="$2"; shift 2;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown arg: $1"; usage; exit 1;;
  esac
done

if [[ -z "$PROJECT" || -z "$ORG" || -z "$TOKEN" || -z "$ENV_FILE" ]]; then
  echo "Missing required arguments" >&2
  usage
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Env file not found: $ENV_FILE" >&2
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required (Node.js)." >&2
  exit 1
fi

# Default keys to set if not provided
DEFAULT_KEYS=(
  DATABASE_URL
  STRIPE_SECRET_KEY
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
)

IFS=',' read -r -a KEYS <<< "${KEYS_ARG:-}"
if [[ -z "${KEYS_ARG:-}" ]]; then
  KEYS=("${DEFAULT_KEYS[@]}")
fi

# Extract value for a key from env file, supports quoted values
get_value() {
  local key="$1"
  local line
  line=$(grep -E "^${key}=" "$ENV_FILE" | tail -n1 || true)
  if [[ -z "$line" ]]; then
    return 1
  fi
  local val
  val=${line#*=}
  # strip surrounding single or double quotes
  val=${val%"}
  val=${val#"}
  val=${val%\'}
  val=${val#\'}
  printf "%s" "$val"
}

for key in "${KEYS[@]}"; do
  val=$(get_value "$key" || true)
  if [[ -z "${val:-}" ]]; then
    echo "Skipping $key (not found in $ENV_FILE)"
    continue
  fi
  echo "Configuring $key in Vercel ($ENVIRONMENT) ..."
  # Remove existing value if exists (ignore errors), then add new value non-interactively
  npx vercel env rm "$key" "$ENVIRONMENT" \
    --token "$TOKEN" \
    --scope "$ORG" \
    --project "$PROJECT" >/dev/null 2>&1 || true

  printf "%s" "$val" | npx vercel env add "$key" "$ENVIRONMENT" \
    --token "$TOKEN" \
    --scope "$ORG" \
    --project "$PROJECT" >/dev/null
  echo "✔ $key set"
done

echo "All requested keys processed for $ENVIRONMENT."