const { test, expect } = require("@playwright/test");

test.describe.configure({ mode: "serial" });

test.describe("Open website", () => {
  test("Check the state after open the page", async ({ page }) => {
    await page.goto("http://5.189.186.217");
    await expect(page.locator("span.card-title").nth(0)).toBeVisible();
  });
});
