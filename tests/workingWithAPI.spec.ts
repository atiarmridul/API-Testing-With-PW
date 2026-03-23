import { test, expect, request } from "@playwright/test";
import tags from "../test-data/tags.json";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Sign in").click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("mridul.uits@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("123456789");
  await page.getByRole("button", { name: "Sign in" }).click();
});

// test("has title", async ({ page }) => {
//   await page.route("*/**/api/articles*", async (route) => {
//     const response = await route.fetch();
//     const responseBody = await response.json();
//     responseBody.articles[0].title = "This is a MOCK test title";
//     responseBody.articles[0].description = "This is a MOCK desctiption";

//     await route.fulfill({
//       body: JSON.stringify(responseBody),
//     });
//   });
//   await page.getByText("Global Feed").click();
//   await expect(page.locator(".navbar-brand")).toHaveText("conduit");
//   await expect(page.locator("a.preview-link h1").first()).toContainText(
//     "This is a MOCK test title",
//   );
//   await expect(page.locator("a.preview-link p").first()).toContainText(
//     "This is a MOCK desctiption",
//   );
// });

test("Create & delete artice", async ({ page, request }) => {
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: {
          email: "mridul.uits@gmail.com",
          password: "123456789",
        },
      },
    },
  );

  const responseBody = await response.json();
  const accessToken = responseBody.user.token;

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
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    },
  );
  expect(articleRespose.status()).toEqual(201);

  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Global Feed").click();
  await page.getByText("This is a Mock Article title").click();
  await page.getByText("Delete Article").first().click();
  await expect(page.getByText("This is a Mock Article title")).toBeHidden();
  await expect(page.locator("a.preview-link h1").first()).not.toContainText("This is a MOCK test title");
});
