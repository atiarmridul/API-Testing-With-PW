#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "No git repository found at: $ROOT_DIR"
  exit 1
fi

chmod +x scripts/sync-markdown.sh scripts/update-agent-progress.sh scripts/watch-markdown.sh scripts/install-hooks.sh scripts/validate-commit-message.sh .githooks/pre-commit .githooks/pre-push .githooks/prepare-commit-msg .githooks/commit-msg
git config core.hooksPath .githooks

echo "Installed git hooks from .githooks"
echo "pre-commit now runs scripts/update-agent-progress.sh + scripts/sync-markdown.sh"
echo "prepare-commit-msg inserts a 'Changes:' bullet template for interactive commits"
echo "commit-msg enforces human-readable bullet summaries in commit bodies"
echo "pre-push runs markdown sync and validates commit summaries for commits being pushed"
