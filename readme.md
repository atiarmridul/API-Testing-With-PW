# API Testing With Playwright

Playwright test project for the RealWorld Conduit demo app (`https://conduit.bondaracademy.com/`) focused on browser-level API mocking and response validation.

## What This Project Covers

- API response mocking via `page.route()` in UI tests.
- Intercepted response mutation and assertion in the UI flow.
- Multi-browser execution (`chromium`, `firefox`, `webkit`).

## Project Structure

- `playwright.config.ts`: Playwright configuration and browser projects.
- `tests/workingWithAPI.spec.ts`: UI + API interception/mocking example.
- `test-data/tags.json`: Mock payload used in route interception.
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

Run all tests (current suite runs `tests/workingWithAPI.spec.ts`):

```bash
npx playwright test
```

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
- `prepare-commit-msg`: auto-adds a descriptive `Changes:` list only when the message has no body bullets yet.
- `commit-msg`: accepts either descriptive bullets under `Changes:` or plain descriptive body bullets.
- `pre-push`: runs markdown sync validation before allowing push.

Optional commit metadata for tracker entries:

```bash
TASK="Describe your task" NEXT_STEP="Describe the next action" git commit -m "your message"
```

## Notes

- API endpoints used:
  - `https://conduit-api.bondaracademy.com/api`
  - `https://conduit.bondaracademy.com/`
- Generated artifacts such as `playwright-report/` and `test-results/` are ignored via `.gitignore`.

## Docs

- Project index: `docs/index.md`
- Contributing: `docs/contributing.md`
- Troubleshooting: `docs/troubleshooting.md`
- Change log: `docs/changelog.md`
