#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/gh-secrets-setup.sh \
#     --repo <owner/repo> \
#     --vercel-token <token> \
#     --vercel-org-id <org_id> \
#     --vercel-project-id <project_id>
# Requires: GitHub CLI (gh) logged in with repo:admin scope

usage() {
  cat <<EOF
Usage: $0 --repo <owner/repo> --vercel-token <token> --vercel-org-id <org_id> --vercel-project-id <project_id>

Sets GitHub Actions secrets needed by the Vercel deploy workflow:
  - VERCEL_TOKEN
  - VERCEL_ORG_ID
  - VERCEL_PROJECT_ID

Example:
  $0 --repo LionSpaceAdmin/LionSTour \
     --vercel-token xxx \
     --vercel-org-id org_abc123 \
     --vercel-project-id prj_abc123
EOF
}

REPO=""
VERCEL_TOKEN=""
VERCEL_ORG_ID=""
VERCEL_PROJECT_ID=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo)
      REPO="$2"; shift 2;;
    --vercel-token)
      VERCEL_TOKEN="$2"; shift 2;;
    --vercel-org-id)
      VERCEL_ORG_ID="$2"; shift 2;;
    --vercel-project-id)
      VERCEL_PROJECT_ID="$2"; shift 2;;
    -h|--help)
      usage; exit 0;;
    *)
      echo "Unknown arg: $1"; usage; exit 1;;
  esac
done

if [[ -z "$REPO" || -z "$VERCEL_TOKEN" || -z "$VERCEL_ORG_ID" || -z "$VERCEL_PROJECT_ID" ]]; then
  echo "Missing required arguments" >&2
  usage
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required. Install: https://cli.github.com/" >&2
  exit 1
fi

echo "Setting secrets in $REPO ..."

echo -n "$VERCEL_TOKEN" | gh secret set VERCEL_TOKEN -R "$REPO" --app actions --body -
echo -n "$VERCEL_ORG_ID" | gh secret set VERCEL_ORG_ID -R "$REPO" --app actions --body -
echo -n "$VERCEL_PROJECT_ID" | gh secret set VERCEL_PROJECT_ID -R "$REPO" --app actions --body -

echo "Done. Secrets set: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID"