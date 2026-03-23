#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

TRACKER_FILE="docs/agent-progress.md"

if [ ! -f "$TRACKER_FILE" ]; then
  echo "Tracker file not found: $TRACKER_FILE"
  exit 1
fi

TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S %Z')"
SESSION_DATE="$(date '+%Y-%m-%d')"
TASK="${TASK:-Auto-update tracker from pre-commit hook.}"
STATUS="${STATUS:-Completed}"
NEXT_STEP="${NEXT_STEP:-Review and refine this auto-generated session note if needed.}"

STAGED_FILES=()
while IFS= read -r file; do
  [ -n "$file" ] && STAGED_FILES+=("$file")
done < <(git diff --cached --name-only --diff-filter=ACDMRTUXB | LC_ALL=C sort -u)

if [ "${#STAGED_FILES[@]}" -eq 0 ]; then
  echo "No staged files found; skipping docs/agent-progress.md update."
  exit 0
fi

FILTERED_FILES=()
for file in "${STAGED_FILES[@]}"; do
  case "$file" in
    docs/agent-progress.md)
      continue
      ;;
    *)
      FILTERED_FILES+=("$file")
      ;;
  esac
done

if [ "${#FILTERED_FILES[@]}" -eq 0 ]; then
  FILTERED_FILES=("docs/agent-progress.md")
fi

FILES_CHANGED=""
for file in "${FILTERED_FILES[@]}"; do
  if [ -n "$FILES_CHANGED" ]; then
    FILES_CHANGED="${FILES_CHANGED}, "
  fi
  FILES_CHANGED="${FILES_CHANGED}\`${file}\`"
done

TMP_FILE="$(mktemp)"

# Update "Last Updated" section timestamp.
awk -v ts="$TIMESTAMP" '
BEGIN {
  in_last_updated = 0
  replaced = 0
}
{
  if ($0 == "## Last Updated") {
    print
    in_last_updated = 1
    next
  }

  if (in_last_updated == 1) {
    if ($0 ~ /^- /) {
      print "- " ts
      in_last_updated = 0
      replaced = 1
      next
    }

    print "- " ts
    in_last_updated = 0
    replaced = 1
  }

  print
}
END {
  if (replaced == 0) {
    print ""
    print "## Last Updated"
    print "- " ts
  }
}
' "$TRACKER_FILE" > "$TMP_FILE"
mv "$TMP_FILE" "$TRACKER_FILE"

SESSION_ENTRY="$(cat <<EOF
### ${SESSION_DATE} (Auto Hook)
- Task: ${TASK}
- Status: ${STATUS}.
- Files changed: ${FILES_CHANGED}.
- Next step: ${NEXT_STEP}
EOF
)"

TMP_FILE="$(mktemp)"
ENTRY_FILE="$(mktemp)"
BEFORE_FILE="$(mktemp)"
AFTER_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE" "$ENTRY_FILE" "$BEFORE_FILE" "$AFTER_FILE"' EXIT

printf "%s\n" "$SESSION_ENTRY" > "$ENTRY_FILE"

if grep -q '^## Update Rules$' "$TRACKER_FILE"; then
  awk '
  /^## Update Rules$/ { exit }
  { print }
  ' "$TRACKER_FILE" > "$BEFORE_FILE"

  awk '
  start == 1 { print }
  /^## Update Rules$/ {
    start = 1
    print
  }
  ' "$TRACKER_FILE" > "$AFTER_FILE"

  {
    cat "$BEFORE_FILE"
    echo
    cat "$ENTRY_FILE"
    echo
    cat "$AFTER_FILE"
  } > "$TMP_FILE"
else
  {
    cat "$TRACKER_FILE"
    echo
    cat "$ENTRY_FILE"
  } > "$TMP_FILE"
fi

mv "$TMP_FILE" "$TRACKER_FILE"

echo "Updated $TRACKER_FILE"
