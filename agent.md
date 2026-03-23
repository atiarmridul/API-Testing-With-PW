# AGENT.md

## Project Context
- **Name**: `pw-apitest-app`
- **Type**: Playwright API + UI test project
- **Primary Language**: TypeScript
- **Test Runner**: Playwright Test (`@playwright/test`)
- **Target Application**: `https://conduit.bondaracademy.com/`
- **Primary API Host**: `https://conduit-api.bondaracademy.com/`

## Directory Structure
- `tests/`: Playwright spec files (`*.spec.ts`)
- `test-data/`: JSON fixtures used in tests (example: `test-data/tags.json`)
- `playwright.config.ts`: Playwright runtime and browser config
- `docs/`: Agent notes, progress, and changelog docs

## Current Coding Style (Based on Existing Code)
1. **Imports and Modules**
- Use ESM-style imports in test files.
- Keep imports at top of file, grouped simply (Playwright imports first, fixture imports after).

2. **Formatting**
- Use double quotes for strings.
- Use semicolons consistently.
- Keep indentation to 2 spaces.
- Keep trailing commas where formatter applies.

3. **Test Structure**
- Use `test.beforeEach` for shared setup.
- Keep tests small and direct with focused assertions.
- Use async Playwright fixtures in function parameters (example: `async ({ page }) => { ... }`).
- Use short, clear test names matching current style (example: `"has title"`).

4. **API Mocking and Fixtures**
- Keep reusable mock payloads in `test-data/*.json`.
- Import fixture JSON directly in specs.
- Mock network calls with `page.route(...)` and respond with `route.fulfill({ body: JSON.stringify(...) })`.
- Use explicit full URLs for route interception and navigation when already used in file.

5. **Assertions and Selectors**
- Prefer Playwright `expect` assertions with locators (example: `expect(page.locator(...)).toHaveText(...)`).
- Keep selectors readable and practical; match existing selector strategy in the file being edited.

## Agent Guidelines
1. Add or update tests only under `tests/` with `.spec.ts` extension.
2. Match existing local style in the edited file first; do not introduce unrelated formatting changes.
3. Prefer fixture-driven test data from `test-data/` rather than hardcoding large payloads.
4. Do not modify `playwright.config.ts` unless explicitly requested.
5. Run tests with `npx playwright test` when validation is requested.
6. Read and update [agent-progress.md](./agent-progress.md) when tracking session progress is required.
7. Document notable changes in [changelog.md](./changelog.md) when documentation updates are part of the task.
8. Run `bash scripts/sync-markdown.sh` after adding or moving markdown files, or rely on the configured Git hooks.
9. Follow `AGENTS.md` strictly.
10. Match existing naming and test style.
11. Prefer minimal diffs.
12. Run lint/tests before final answer.
