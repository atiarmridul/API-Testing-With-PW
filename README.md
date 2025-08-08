
# Playwright API Testing Project

This project demonstrates advanced API testing techniques using Playwright, showcasing how to interact with a live API to perform end-to-end tests, manage authentication, and mock API responses.

## Technologies Used

- **Playwright:** For orchestrating browser automation and API requests.
- **TypeScript:** For writing type-safe and maintainable test scripts.
- **Node.js:** As the runtime environment for executing the tests.

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js installed on your machine.
- **npm:** Node Package Manager, which comes with Node.js.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd API-Testing-With-PW
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Tests

To execute the Playwright tests, run the following command:

```bash
npm test
```

This will launch the Playwright test runner and execute all the test suites defined in the `tests/` directory.

## Test Structure

The project is organized into the following key files:

- **`playwright.config.ts`:** The main configuration file for Playwright, where you can define test projects, browser settings, and other options.

- **`tests/auth.setup.ts`:** A setup file that handles user authentication. It logs in a user and saves the authentication state to a file, which can be reused across multiple tests to maintain a logged-in session.

- **`tests/workingWithAPI.spec.ts`:** This test suite demonstrates how to mock API responses. It intercepts network requests and provides a mock response, allowing you to test the front-end behavior without relying on a live back-end.

- **`tests/ArticleLifeCycleWithAPI.spec.ts`:** This suite showcases a complete end-to-end scenario where an article is created and then deleted via API calls. It demonstrates how to chain API requests and use authentication tokens to perform actions on behalf of a user.

## Key Scenarios

This project covers several important testing scenarios:

- **Authentication:** The `auth.setup.ts` file shows how to programmatically log in a user and persist the authentication state, which is a common requirement for testing protected routes and features.

- **API Mocking:** The `workingWithAPI.spec.ts` file demonstrates how to intercept and mock API calls. This is useful for testing edge cases, isolating the front-end from back-end changes, and ensuring reliable test execution.

- **End-to-End API Testing:** The `ArticleLifeCycleWithAPI.spec.ts` file provides an example of a full "happy path" scenario. It creates an article, verifies its creation, and then cleans up by deleting it, all through direct API interactions.

By studying these examples, you can gain a deeper understanding of how to leverage Playwright for robust and efficient API testing.
