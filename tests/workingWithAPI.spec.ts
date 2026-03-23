import { test, expect, request } from "@playwright/test";
import tags from "../test-data/tags.json";

// Runs before each test: stubs tags and opens the Conduit home page.
test.beforeEach(async ({ page }) => {
  // Intercepts the tags endpoint and returns fixture data for stable test behavior.
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });
  await page.goto("https://conduit.bondaracademy.com/");
});

// Mocks the articles API response and verifies the updated title and description are shown in the feed.
test("Mocks the articles API response and verifies", async ({ page }) => {
  await page.route("*/**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "This is a MOCK test title";
    responseBody.articles[0].description = "This is a MOCK desctiption";

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });
  await page.getByText("Global Feed").click();
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("a.preview-link h1").first()).toContainText(
    "This is a MOCK test title",
  );
  await expect(page.locator("a.preview-link p").first()).toContainText(
    "This is a MOCK desctiption",
  );
});

// Creates an article through API, then removes it from the UI and verifies it is no longer visible.
test("Create using API & delete artice using UI", async ({ page, request }) => {
  // Creates an article directly through API using the authenticated request context.
  const articleRespose = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "This is a Mock Article title",
          description: "This is a Mock Article description",
          body: "This is a Mock Article body",
          tagList: [],
        },
      },
    },
  );
  expect(articleRespose.status()).toEqual(201);

  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Global Feed").click();
  await page.getByText("This is a Mock Article title").click();
  await page.getByText("Delete Article").first().click();
  await expect(page.getByText("This is a Mock Article title")).toBeHidden();
  await expect(page.locator("a.preview-link h1").first()).not.toContainText(
    "This is a MOCK test title",
  );
});

// Creates an article from the UI, deletes it via API, and verifies it is removed from the feed.
test("Create using UI & delete artice using API", async ({ page, request }) => {
  await page.getByText("New Article").click();
  await page
    .getByRole("textbox", { name: "Article Title" })
    .fill("This is a Mock Article title 2");
  await page
    .getByRole("textbox", { name: "What's this article about?" })
    .fill("This is a Mock Article description 2");
  await page
    .getByRole("textbox", { name: "Write your article (in markdown)" })
    .fill("This is a Mock Article body 2");
  await page.getByRole("button", { name: "Publish Article" }).click();
  const articleCreateResponse = await page.waitForResponse(
    "https://conduit-api.bondaracademy.com/api/articles/",
  );
  // Extracts article slug from the create response to delete it by API later.
  const articleCreateResponseBody = await articleCreateResponse.json();
  const slugId = articleCreateResponseBody.article.slug;
  await page.getByText("Home").click();
  await page.getByText("Global Feed").click();
  await expect(page.locator("a.preview-link h1").first()).toContainText(
    "This is a Mock Article title 2",
  );
  await expect(page.getByText("This is a Mock Article title 2")).toBeVisible();

  // Deletes the newly created article directly through the backend API.
  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
  );
  expect(deleteArticleResponse.status()).toEqual(204);
  await page.getByText("Global Feed").click();
});
