const { test, expect } = require("@playwright/test");

test.describe("Open Guru website", () => {
  test("Open the main page", async ({ page }) => {
    await page.goto("https://www.guru99.com/");
    await expect(page.getByText("Tutorials Library")).toBeVisible();
  });
});
