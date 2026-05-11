#!/usr/bin/env bash
#
# deploy.sh — Build and deploy openoaisis.com to Google Cloud Storage.
#
# Usage:   ./scripts/deploy.sh
#
# Env overrides:
#   BUCKET=gs://www.openoaisis.com          # destination GCS bucket
#   CLOUDFLARE_API_TOKEN=...                # optional, purges CF cache after deploy
#   CLOUDFLARE_ZONE_ID=...                  # optional, paired with token above
#
# One-time setup (run once per machine, interactively):
#   gcloud auth login
#   gcloud config set project <project-id>
#
# Hosting setup (for reference):
#   - DNS / CDN: Cloudflare (www.openoaisis.com)
#   - Origin:    Google Cloud Storage bucket gs://www.openoaisis.com (static website)
#   - Apex:      openoaisis.com → 307 redirect to www.openoaisis.com

set -euo pipefail

export PATH="/opt/homebrew/share/google-cloud-sdk/bin:$PATH"

BUCKET="${BUCKET:-gs://www.openoaisis.com}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if ! command -v gcloud >/dev/null 2>&1; then
  echo "ERROR: gcloud not on PATH. Install with: brew install --cask google-cloud-sdk"
  exit 1
fi

ACTIVE_ACCOUNT="$(gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null | head -1)"
if [ -z "$ACTIVE_ACCOUNT" ]; then
  echo "ERROR: gcloud is not authenticated."
  echo "Run once:  gcloud auth login"
  echo "Then:      gcloud config set project <project-id>"
  exit 1
fi
echo "==> Authenticated as: $ACTIVE_ACCOUNT"

if ! gsutil ls "$BUCKET" >/dev/null 2>&1; then
  echo "ERROR: cannot access $BUCKET"
  echo "  - Verify the bucket name and that $ACTIVE_ACCOUNT has Storage Object Admin on it."
  exit 1
fi
echo "==> Target bucket:    $BUCKET"

echo "==> Building production bundle..."
npm run build

if [ ! -d dist ]; then
  echo "ERROR: dist/ not produced by build."
  exit 1
fi

# Hashed assets — safe to cache forever (filename changes per build).
echo "==> Uploading hashed assets (immutable, 1y cache)..."
gsutil -m \
  -h "Cache-Control:public, max-age=31536000, immutable" \
  rsync -r dist/assets/ "$BUCKET/assets/"

# HTML entry points — short cache so deploys propagate quickly.
echo "==> Uploading HTML (5 min cache, must-revalidate)..."
gsutil -m \
  -h "Cache-Control:public, max-age=300, must-revalidate" \
  -h "Content-Type:text/html; charset=utf-8" \
  cp dist/index.html "$BUCKET/index.html"
gsutil -m \
  -h "Cache-Control:public, max-age=300, must-revalidate" \
  -h "Content-Type:text/html; charset=utf-8" \
  cp dist/404.html "$BUCKET/404.html"

# Purge Cloudflare cache if credentials are set in env.
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ] && [ -n "${CLOUDFLARE_ZONE_ID:-}" ]; then
  echo "==> Purging Cloudflare cache..."
  curl -fsS -X POST \
    "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}' >/dev/null
  echo "    Cloudflare cache purged."
else
  echo "==> Skipping Cloudflare purge (set CLOUDFLARE_API_TOKEN + CLOUDFLARE_ZONE_ID to enable)."
fi

echo ""
echo "Deploy complete."
echo "  Live:  https://www.openoaisis.com"
echo "  Note:  Without a Cloudflare purge, the CDN may serve old HTML for up to 5 min."
