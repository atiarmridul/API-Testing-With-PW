# API Testing With Playwright

Playwright test project for the RealWorld Conduit demo app (`https://conduit.bondaracademy.com/`) focused on browser-level API mocking and response validation.

## What This Project Covers

- API response mocking via `page.route()` in UI tests.
- Intercepted response mutation and assertion in the UI flow.
- Multi-browser execution (`chromium`, `firefox`, `webkit`).

## Project Structure

- `playwright.config.ts`: Playwright configuration and browser projects.
- `tests/auth.setup.ts`: Setup project that authenticates and prepares reusable auth state.
- `tests/workingWithAPI.spec.ts`: UI + API interception/mocking example.
- `test-data/tags.json`: Mock payload used in route interception.
- `.auth/user.json`: Stored authenticated browser state consumed by browser projects.
- `docs/`: Project docs and navigation.

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Setup

```bash
npm install
npx playwright install
bash scripts/install-hooks.sh
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Note:
- The `setup` project runs first and refreshes auth state used by dependent browser projects.

Run a single spec:

```bash
npx playwright test tests/workingWithAPI.spec.ts
```

Open the HTML report:

```bash
npx playwright show-report
```

## Git Hook Automation

After running `bash scripts/install-hooks.sh`, the repository hooks handle:

- `pre-commit`: updates `docs/agent-progress.md`, syncs markdown index/docs, and stages markdown changes.
- `prepare-commit-msg`: auto-adds a `Changes:` template only for interactive commits with no body bullets yet.
- `commit-msg`: requires human-readable bullet points in the commit body.
- `pre-push`: runs markdown sync validation and validates commit-message quality for commits being pushed.

Commit message format example:

```text
chore(tests): improve auth setup resilience

- update auth setup to locate jwtToken by key instead of array index
- refresh docs to match current hook behavior and auth setup flow
```

Optional commit metadata for tracker entries:

```bash
TASK="Describe your task" NEXT_STEP="Describe the next action" git commit -m "your message"
```

## Notes

- Authentication flow:
  - `tests/auth.setup.ts` logs in via API and refreshes `.auth/user.json`.
  - Browser projects (`chromium`, `firefox`, `webkit`) depend on `setup` and use `storageState`.
- API endpoints used:
  - `https://conduit-api.bondaracademy.com/api`
  - `https://conduit.bondaracademy.com/`
- Generated artifacts such as `playwright-report/` and `test-results/` are ignored via `.gitignore`.

## Docs

- Project index: `docs/index.md`
- Contributing: `docs/contributing.md`
- Troubleshooting: `docs/troubleshooting.md`
- Change log: `docs/changelog.md`
