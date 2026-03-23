#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 --file <message-file> | --commit <sha>"
}

if [ "${#}" -ne 2 ]; then
  usage
  exit 1
fi

MODE="$1"
TARGET="$2"

case "$MODE" in
  --file)
    if [ ! -f "$TARGET" ]; then
      echo "Commit message file not found: $TARGET"
      exit 1
    fi
    MESSAGE="$(cat "$TARGET")"
    CONTEXT="commit message"
    ;;
  --commit)
    if ! git cat-file -e "${TARGET}^{commit}" >/dev/null 2>&1; then
      echo "Commit not found: $TARGET"
      exit 1
    fi
    MESSAGE="$(git log -1 --pretty=%B "$TARGET")"
    CONTEXT="commit $TARGET"
    ;;
  *)
    usage
    exit 1
    ;;
esac

# Remove carriage returns for cross-platform safety.
MESSAGE="${MESSAGE//$'\r'/}"

LINES=()
while IFS= read -r line; do
  LINES+=("$line")
done < <(printf '%s\n' "$MESSAGE")

SUBJECT_INDEX=-1
SUBJECT=""
for i in "${!LINES[@]}"; do
  LINE="${LINES[$i]}"
  if [[ "$LINE" =~ ^[[:space:]]*$ ]] || [[ "$LINE" =~ ^# ]]; then
    continue
  fi
  SUBJECT="$LINE"
  SUBJECT_INDEX="$i"
  break
done

if [ "$SUBJECT_INDEX" -lt 0 ]; then
  echo "Commit blocked: $CONTEXT is empty."
  exit 1
fi

# Skip merge commits.
if [[ "$SUBJECT" =~ ^Merge[[:space:]] ]]; then
  exit 0
fi

BULLETS=()
for ((i = SUBJECT_INDEX + 1; i < ${#LINES[@]}; i++)); do
  LINE="${LINES[$i]}"
  if [[ "$LINE" =~ ^# ]]; then
    continue
  fi
  if [[ "$LINE" =~ ^-[[:space:]]+(.+) ]]; then
    BULLETS+=("${BASH_REMATCH[1]}")
  fi
done

if [ "${#BULLETS[@]}" -eq 0 ]; then
  echo "Commit blocked: $CONTEXT must include human-readable bullet points in the body."
  echo "Example:"
  echo "  <title>"
  echo
  echo "  - update auth setup to generate reusable storage state"
  echo "  - add API test comments for non-obvious steps"
  exit 1
fi

shopt -s nocasematch
for BULLET in "${BULLETS[@]}"; do
  TRIMMED="$(printf '%s' "$BULLET" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"

  if [ -z "$TRIMMED" ]; then
    echo "Commit blocked: empty bullet found in $CONTEXT."
    exit 1
  fi

  if [ "${#TRIMMED}" -lt 10 ]; then
    echo "Commit blocked: bullet is too short for a meaningful summary: \"$TRIMMED\""
    exit 1
  fi

  if [[ "$TRIMMED" =~ ^(Updated\ areas:|Change\ types:|Diff\ stats:) ]]; then
    echo "Commit blocked: replace generated stats bullets with plain-language changes."
    exit 1
  fi

  if [[ "$TRIMMED" =~ ^[ACDMRTUXB][0-9]*[[:space:]]+ ]]; then
    echo "Commit blocked: describe the change; do not use raw git status shorthand."
    exit 1
  fi

  if [[ "$TRIMMED" =~ (<[^>]+>|todo|tbd|describe\ what\ changed|describe\ why) ]]; then
    echo "Commit blocked: replace placeholder text in bullet: \"$TRIMMED\""
    exit 1
  fi
done
shopt -u nocasematch

exit 0
