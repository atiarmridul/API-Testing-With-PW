import { test, expect, request } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  //here we also logged in with browser to authorize the browser to interect with different locatiors to verify
  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Sign in").click();
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("atiaraits19@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("123456789");
  await page.getByRole("button", { name: "Sign in" }).click();
});

test("Create Article & Delete Article Flow", async ({ page, request }) => {
  //login flow
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: { email: "atiaraits19@gmail.com", password: "123456789" },
      },
    }
  );
  const responseBody = await response.json();

  //store the access token in varialble
  const accessToken = await responseBody.user.token;

  //create a new article using the previously stored access token
  const articleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "Playwright is AWESOME",
          description: "This is a new article about Playwright",
          body: "This is a Playwright details",
          tagList: [],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  //asserting the status code after create the article
  expect(articleResponse.status()).toEqual(201);

  const articleResponseBody = await articleResponse.json();

  //store the slug id of the created article in variable
  const slugId = await articleResponseBody.article.slug;

  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Global Feed").click();

  //asserting the article is created
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "Playwright is AWESOME"
  );

  //delete the created article with the stored slugId
  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
    {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  //asserting the status code after deleting the article
  expect(deleteArticleResponse.status()).toEqual(204);

  await page.getByText("Settings").click();
  await page.getByRole("button", { name: "Or click here to logout." }).click();
});
