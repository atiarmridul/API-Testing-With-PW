import { test, expect, request } from "@playwright/test";
import tags from "../test-data/tags.json";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });
  await page.goto("https://conduit.bondaracademy.com/");
});

test("has title", async ({ page }) => {
  await page.route("*/**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "This is a Mock test title";
    responseBody.articles[0].description = "This is a Mock test description";

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "This is a Mock test title"
  );
  await expect(page.locator("app-article-list p").first()).toContainText(
    "This is a Mock test description"
  );
  // await page.waitForTimeout(5000);
});

// test("delete article", async ({ page, request }) => {
//   const response = await request.post(
//     "https://conduit-api.bondaracademy.com/api/users/login",
//     {
//       data: {
//         user: { email: "atiaraits19@gmail.com", password: "123456789" },
//       },
//     }
//   );
//   const responseBody = await response.json();
//   const accessToken = await responseBody.user.token;

//   const articleResponse = await request.post(
//     "https://conduit-api.bondaracademy.com/api/articles/",
//     {
//       data: {
//         article: {
//           title: "This is API Testing Title",
//           description: "For Testing API with PW",
//           body: "This is a sample description in markdown. ",
//           tagList: [],
//         },
//       },
//       headers: {
//         Authorization: `Token ${accessToken}`,
//       },
//     }
//   );

//   expect(articleResponse.status()).toEqual(201);

//   await page.waitForTimeout(2000);
//   await page.goto("https://conduit.bondaracademy.com/");
//   await page.getByText("Global Feed").click();
//   await page.getByText("This is API Testing Title").click();
//   await page.getByRole("button", { name: "Delete Article" }).first().click();
//   await expect(page.locator("app-article-list h1").first()).not.toContainText(
//     "This is API Testing Title"
//   );
// });

// test("Create Article", async ({ page, request, browser }) => {
//   await page.getByText("New Article").click();
//   await page.getByPlaceholder("Article Title").fill("Playwright is AWESOME");
//   await page
//     .getByPlaceholder("What's this article about?")
//     .fill("This is a new article about Playwright");
//   await page
//     .getByPlaceholder("Write your article (in markdown)")
//     .fill("This is a Playwright details");
//   await page.getByPlaceholder("Enter tags").fill("PW");
//   await page.getByRole("button", { name: "Publish Article" }).click();

//   const articleResponse = await page.waitForResponse(
//     "https://conduit-api.bondaracademy.com/api/articles/"
//   );
//   const articleResponseBody = await articleResponse.json();
//   const slugId = await articleResponseBody.article.slug;

//   await expect(page.locator("h1")).toContainText("Playwright is AWESOME");
//   await page.goto("https://conduit.bondaracademy.com/");
//   await page.getByText("Global Feed").click();
//   await expect(page.locator("app-article-list h1").first()).toContainText(
//     "Playwright is AWESOME"
//   );

//   const response = await request.post(
//     "https://conduit-api.bondaracademy.com/api/users/login",
//     {
//       data: {
//         user: { email: "atiaraits19@gmail.com", password: "123456789" },
//       },
//     }
//   );
//   const responseBody = await response.json();
//   const accessToken = await responseBody.user.token;

//   const deleteArticleResponse = await request.delete(
//     `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
//     {
//       headers: {
//         Authorization: `Token ${accessToken}`,
//       },
//     }
//   );

//   expect(deleteArticleResponse.status()).toEqual(204);
// });
