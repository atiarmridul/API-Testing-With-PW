# Troubleshooting

Common issues for this repository and how to fix them quickly.

## Hook Installation Fails
Symptom:
- `No git repository found at: ...` from `scripts/install-hooks.sh`.

Fix:
- Run the command from the actual git repository root.
- Verify git context:
  - `git rev-parse --show-toplevel`
- Re-run:
  - `bash scripts/install-hooks.sh`

## Hooks Do Not Run
Symptom:
- `pre-commit` or `pre-push` does not execute markdown sync.

Fix:
- Check hook path:
  - `git config core.hooksPath`
- Expected value:
  - `.githooks`
- Reinstall hooks:
  - `bash scripts/install-hooks.sh`

## Push Is Blocked By Markdown Changes
Symptom:
- `pre-push` says markdown files were updated and asks to commit first.

Fix:
1. Review generated changes:
   - `git status --short`
2. Stage/commit docs:
   - `git add docs/index.md docs/changelog.md docs/agent-progress.md`
   - `git commit -m "Update markdown docs"`
3. Push again.

## Commit Is Blocked By Commit Message Rules
Symptom:
- `commit-msg` rejects the commit because body bullets are missing or non-descriptive.

Fix:
1. Keep a short title line.
2. Add body bullets that describe what changed in plain language.
3. Avoid placeholders/stat summaries (`TODO`, `Updated areas`, `Diff stats`).
4. Retry commit.

Example:
- `git commit -m "chore(docs): refresh hook docs" -m "- update README hook behavior notes\n- add troubleshooting guidance for commit message validation"`

## Push Is Blocked By Commit Message Validation
Symptom:
- `pre-push` blocks with a message that one or more commits lack required summary bullets.

Fix:
1. Identify failing commit(s):
   - `git log --oneline --decorate -n 10`
2. Reword each commit message (newest first):
   - `git rebase -i <base-commit>`
   - mark commits as `reword`
3. Push again after rewording:
   - `git push --force-with-lease`

## `docs/index.md` Is Out Of Date
Fix:
- Run:
  - `bash scripts/sync-markdown.sh`
- Or rely on:
  - `.githooks/pre-commit`
  - `.githooks/pre-push`

## Playwright Test Run Issues
Symptom:
- Browser executable missing or test launch failures.

Fix:
- Install Playwright browsers:
  - `npx playwright install`
- Then rerun tests:
  - `npx playwright test`

## Continuous Watch Mode Not Stopping
Fix:
- `watch-markdown.sh` runs until interrupted.
- Stop with `Ctrl+C`.

## Related Docs
- [README](../readme.md)
- [Project Index](./index.md)
- [Contributing](./contributing.md)
