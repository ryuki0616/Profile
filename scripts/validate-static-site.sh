#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

required_files=(
  "index.html"
  "privacy.html"
  "analytics.js"
  "main.js"
  "styles.css"
  "ogp.png"
  "vendor/three.r128.min.js"
  "img/DayBreak.png"
  "img/digilive.png"
  "img/log_chek_AI.png"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file" >&2
    exit 1
  fi
done

node --check analytics.js
node --check main.js

while IFS= read -r ref; do
  if [[ ! -e "$ref" ]]; then
    echo "Broken local reference: $ref" >&2
    exit 1
  fi
done < <(
  rg --no-filename -oN '(?:src|href)="[^"]+"' index.html privacy.html \
    | sed -E 's/^(src|href)="([^"]+)"$/\2/' \
    | grep -vE '^(https?:|mailto:|#|data:)' \
    | sort -u
)

echo "Static site validation passed."
