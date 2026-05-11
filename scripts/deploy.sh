#!/usr/bin/env bash
#
# deploy.sh — Build and deploy openoaisis.com to Google Cloud Storage,
#             purge Cloudflare, and verify the new bundle is live.
#
# Goal: edit -> build -> ./scripts/deploy.sh -> live at openoaisis.com
#       in roughly 30 seconds end-to-end.
#
# Usage:   ./scripts/deploy.sh
#
# Sources, in order (first match wins for any unset variable):
#   1. Existing shell environment
#   2. Website-Oaisis/.env       (repo-local, gitignored)
#   3. ~/sandman-workspace/.env  (Mac Studio shared)
#
# Env vars consumed:
#   BUCKET=gs://www.openoaisis.com          # destination GCS bucket
#   CLOUDFLARE_API_TOKEN=...                # purges CF cache after deploy
#   CLOUDFLARE_ZONE_ID=...                  # paired with token
#
# One-time setup (per machine):
#   gcloud auth login
#   gcloud config set project openoaisis
#
# Hosting setup (for reference):
#   - DNS / CDN: Cloudflare (www.openoaisis.com)
#   - Origin:    Google Cloud Storage bucket gs://www.openoaisis.com (static)
#   - Apex:      openoaisis.com -> 307 redirect to www.openoaisis.com

set -euo pipefail

export PATH="/opt/homebrew/share/google-cloud-sdk/bin:$PATH"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# ---- Auto-source .env files (without leaking anything) -----------------------
load_env() {
  local file="$1"
  [ -f "$file" ] || return 0
  # shellcheck disable=SC2046
  set -a
  # Source only KEY=VALUE-style lines, skip comments and empties
  # Using `source` inside `set -a` exports anything assigned.
  while IFS= read -r line; do
    case "$line" in
      ''|\#*) continue ;;
      *=*)
        key="${line%%=*}"
        # Strip leading 'export '
        key="${key#export }"
        # Only set if not already set in env
        if [ -z "${!key:-}" ]; then
          eval "$line"
        fi
        ;;
    esac
  done <"$file"
  set +a
}

load_env "$REPO_ROOT/.env"
load_env "$HOME/sandman-workspace/.env"

BUCKET="${BUCKET:-gs://www.openoaisis.com}"

# ---- Auth + bucket access checks --------------------------------------------
if ! command -v gcloud >/dev/null 2>&1; then
  echo "ERROR: gcloud not on PATH. Install with: brew install --cask google-cloud-sdk"
  exit 1
fi

ACTIVE_ACCOUNT="$(gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null | head -1)"
if [ -z "$ACTIVE_ACCOUNT" ]; then
  echo "ERROR: gcloud is not authenticated."
  echo "Run once:  gcloud auth login --update-adc"
  echo "Then:      gcloud config set project openoaisis"
  exit 1
fi
echo "==> Authenticated as: $ACTIVE_ACCOUNT"

if ! gsutil ls "$BUCKET" >/dev/null 2>&1; then
  echo "ERROR: cannot access $BUCKET"
  echo "  Most likely: gcloud session expired. Run: gcloud auth login --update-adc"
  exit 1
fi
echo "==> Target bucket:    $BUCKET"

# ---- Build -------------------------------------------------------------------
echo "==> Building production bundle..."
npm run build

if [ ! -d dist ]; then
  echo "ERROR: dist/ not produced by build."
  exit 1
fi

# Capture the hashed JS filename for post-deploy verification
NEW_JS="$(ls dist/assets/index-*.js 2>/dev/null | head -1 | xargs -n1 basename || true)"
NEW_CSS="$(ls dist/assets/index-*.css 2>/dev/null | head -1 | xargs -n1 basename || true)"
echo "    JS:  ${NEW_JS:-?}"
echo "    CSS: ${NEW_CSS:-?}"

# ---- Upload ------------------------------------------------------------------
echo "==> Uploading hashed assets (immutable, 1y cache)..."
gsutil -m \
  -h "Cache-Control:public, max-age=31536000, immutable" \
  rsync -r dist/assets/ "$BUCKET/assets/"

echo "==> Uploading HTML (5 min cache, must-revalidate)..."
gsutil -m \
  -h "Cache-Control:public, max-age=300, must-revalidate" \
  -h "Content-Type:text/html; charset=utf-8" \
  cp dist/index.html "$BUCKET/index.html"
gsutil -m \
  -h "Cache-Control:public, max-age=300, must-revalidate" \
  -h "Content-Type:text/html; charset=utf-8" \
  cp dist/404.html "$BUCKET/404.html"

# ---- Cloudflare purge --------------------------------------------------------
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ] && [ -n "${CLOUDFLARE_ZONE_ID:-}" ]; then
  echo "==> Purging Cloudflare cache..."
  PURGE_RESPONSE="$(curl -fsS -X POST \
    "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}' 2>&1)" || {
      echo "    WARNING: Cloudflare purge returned an error:"
      echo "    $PURGE_RESPONSE"
      echo "    Bundle still landed on GCS; cache will clear within 5 min via must-revalidate."
    }
  if echo "$PURGE_RESPONSE" | grep -q '"success":true'; then
    echo "    Cloudflare cache purged."
  fi
else
  echo "==> Skipping Cloudflare purge (CLOUDFLARE_API_TOKEN + CLOUDFLARE_ZONE_ID not set)."
fi

# ---- Post-deploy verification ------------------------------------------------
echo "==> Verifying live site..."
sleep 2  # let Cloudflare propagate the purge briefly
CB="$(date +%s)"
LIVE_HTML="$(curl -fsS "https://www.openoaisis.com/?v=$CB" 2>/dev/null || true)"
if [ -z "$LIVE_HTML" ]; then
  echo "    WARNING: could not fetch live HTML."
elif [ -n "$NEW_JS" ] && echo "$LIVE_HTML" | grep -q "$NEW_JS"; then
  echo "    Verified: live site references $NEW_JS"
else
  echo "    WARNING: live site does NOT reference $NEW_JS — Cloudflare may still be serving cached HTML."
  echo "    Try: open 'https://www.openoaisis.com/?v=$CB' to bust cache, or wait up to 5 min."
fi

echo ""
echo "Deploy complete."
echo "  Live:    https://www.openoaisis.com"
echo "  Bust:    https://www.openoaisis.com/?v=$CB"
