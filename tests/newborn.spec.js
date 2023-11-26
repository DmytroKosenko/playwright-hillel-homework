const { test, expect } = require("@playwright/test");
const { MainPageNewborn } = require("./pages/mainPageNewborn");

test.describe.configure({ mode: "serial" });

test.describe.skip("Verofication steps for newborn website", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://5.189.186.217");
  });

  test("Check the state after open the page", async ({ page }) => {
    await expect(page.locator("span.card-title").nth(0)).toBeVisible();
  });

  test("Usage POM", async ({ page }) => {
    const mainPageNewBorn = new MainPageNewborn(page);
    await mainPageNewBorn.verifyLogoutVisible();
  });
});
