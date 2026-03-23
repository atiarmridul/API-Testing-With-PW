#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

snapshot() {
  {
    find . -type f -name '*.md' \
      -not -path './node_modules/*' \
      -not -path './.git/*' \
      | LC_ALL=C sort \
      | while IFS= read -r file; do
          [ -n "$file" ] && shasum "$file"
        done
  } | shasum | awk '{print $1}'
}

echo "Watching markdown files for changes..."
echo "Press Ctrl+C to stop."

last_snapshot="$(snapshot)"

while true; do
  sleep 2
  current_snapshot="$(snapshot)"
  if [ "$current_snapshot" != "$last_snapshot" ]; then
    bash scripts/sync-markdown.sh
    last_snapshot="$(snapshot)"
  fi
done
