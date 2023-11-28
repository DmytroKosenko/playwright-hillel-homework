const { test, expect } = require("@playwright/test");
const { MainPageNewborn } = require("./pages/mainPageNewborn");

test.describe.configure({ mode: "serial" });

test.describe("Verofication steps for newborn website", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://5.189.186.217/login");
    await page.getByLabel("Email:").fill("email@dmytro.com");
    await page.getByLabel("Пароль:").fill("abc123");
    await page.locator("button[type='submit']").click();
  });

  test.skip("Check the state after open the page", async ({ page }) => {
    await expect(page.locator("span.card-title").nth(0)).toBeVisible();
    await expect(page.locator("div.row span.card-title").nth(0)).toContainText(
      "Виручка:"
    );
  });

  test.skip("Usage POM", async ({ page }) => {
    const mainPageNewBorn = new MainPageNewborn(page);
    await mainPageNewBorn.verifyLogoutVisible();
  });

  test("Without POM", async ({ page }) => {
    await expect(page.locator("ul > li.bold.last > a")).toHaveText("Вийти");
  });
});
