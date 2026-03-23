# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added `AGENT.md` to persist AI agent instructions and codebase context.
- Added `CHANGELOG.md` to track project modifications.
- Added `docs/agent-progress.md` as the canonical multi-agent handoff and progress tracker.
- Added `readme.md` as a root-level project overview and quick navigation entrypoint.
- Added `index.md` as a repository file index linking key docs, config, tests, and outputs.
- Added `scripts/sync-markdown.sh` to regenerate markdown navigation index.
- Added `.githooks/pre-push` to run markdown sync automatically before every push.
- Added `.githooks/pre-commit` to run markdown sync before every commit.
- Added `scripts/install-hooks.sh` for one-command hook installation.
- Added `scripts/watch-markdown.sh` for continuous local markdown syncing while editing.
- Added `docs/contributing.md` for project-specific contribution workflow.
- Added `docs/troubleshooting.md` for common setup/test/hook issues.

### Changed
- Moved `index.md` to `docs/index.md` to keep non-README markdown files in the docs folder.
- Updated markdown links across docs so navigation remains valid after the move.
- Updated `readme.md` with setup instructions for markdown sync on push.
- Expanded markdown automation docs to include pre-commit and optional watch mode.
- Refreshed `readme.md` with a quick start section, manual sync command, and repository usage notes.
- Updated `readme.md` navigation links to include contributing and troubleshooting docs.
- Updated `readme.md` to reflect the current single-spec test setup in `tests/`.

### Removed
- Removed `tests/ArticleLifeCycleWithAPI.spec.ts`.
- Removed `tests/auth.setup.ts`.
