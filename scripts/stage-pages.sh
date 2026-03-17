#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${1:-dist}"

cd "$ROOT_DIR"
mkdir -p "$BUILD_DIR"

site_paths=(
  "index.html"
  "privacy.html"
  "analytics.js"
  "main.js"
  "styles.css"
  "img"
  "vendor"
  "ogp.png"
)

if [[ -f "CNAME" ]]; then
  site_paths+=("CNAME")
fi

for path in "${site_paths[@]}"; do
  cp -R "$path" "$BUILD_DIR/"
done

echo "Pages artifact staged in $BUILD_DIR"
