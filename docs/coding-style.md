# Coding Style Guide

Living style guide for this repository. Keep this file updated when coding patterns change.

## Scope
- Applies to Playwright tests and config files in this repo.
- Capture existing team style first; only add new conventions after agreement.

## TypeScript Basics
- Use `async`/`await` for Playwright actions and API calls.
- Prefer explicit, readable multiline objects for request payloads and assertions.
- Keep import statements at the top of each file.

## Playwright Test Style
- Use clear test names that describe behavior.
- Add a short comment above each test describing intent.
- Keep shared setup in `test.beforeEach(...)` when reused across tests.
- Use API interception (`page.route`) only where test behavior depends on controlled data.
- Assert critical outcomes after each major action (create/delete/mock flows).

## API Test Patterns
- Use `request.post(...)`/`request.delete(...)` with structured `data` objects.
- Validate important response status codes with `expect(...).toEqual(...)`.
- When needed, extract response JSON into named variables before using nested values.

## Auth and State
- Store reusable auth state in `.auth/user.json`.
- Keep auth bootstrap logic in `tests/auth.setup.ts`.
- Use `storageState` in project config for authenticated browser runs.

## Comments and Readability
- Prefer concise intent-focused comments over line-by-line narration.
- Add comments where workflow intent is not obvious (mocking, token injection, cleanup).
- Keep comments accurate when logic changes.

## Naming
- Keep file names descriptive and aligned with behavior (`*.spec.ts`, `auth.setup.ts`).
- Use variable names that reflect purpose (`articleCreateResponseBody`, `accessToken`, `slugId`).

## Maintenance Rule
- Update this file whenever coding style changes materially in active files.
- If a new pattern appears in `tests/` or `playwright.config.ts`, add or revise the relevant section.
