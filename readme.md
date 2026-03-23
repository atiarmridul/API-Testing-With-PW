# API Testing With Playwright

Playwright test project for the RealWorld Conduit demo app (`https://conduit.bondaracademy.com/`) with both browser-level and direct API validation.

## What This Project Covers

- API response mocking via `page.route()` in UI tests.
- API-based article create/delete flow with assertions.
- Auth state setup and reuse through Playwright storage state.
- Multi-browser execution (`chromium`, `firefox`, `webkit`).

## Project Structure

- `playwright.config.ts`: Playwright configuration and browser projects.
- `tests/workingWithAPI.spec.ts`: UI + API interception/mocking example.
- `tests/ArticleLifeCycleWithAPI.spec.ts`: End-to-end API lifecycle test (create/delete article).
- `tests/auth.setup.ts`: Authentication setup that writes `.auth/user.json`.
- `test-data/tags.json`: Mock payload used in route interception.
- `docs/`: Project docs and navigation.

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

Run all tests:

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

## Notes

- Test credentials are currently hardcoded in:
  - `tests/auth.setup.ts`
  - `tests/ArticleLifeCycleWithAPI.spec.ts`
- API endpoints used:
  - `https://conduit-api.bondaracademy.com/api`
  - `https://conduit.bondaracademy.com/`
- Generated artifacts such as `playwright-report/` and `test-results/` are ignored via `.gitignore`.

## Docs

- Project index: `docs/index.md`
- Contributing: `docs/contributing.md`
- Troubleshooting: `docs/troubleshooting.md`
- Change log: `docs/changelog.md`
