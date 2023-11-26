const { test, expect } = require("@playwright/test");

test.describe.configure({ mode: "serial" });

test.describe("Set up geolocation of London", () => {
  test("Check the state after open the page", async ({ page, browser }) => {
    const context = await browser.newContext({
      locale: "en-GB",
      timezoneId: "Europe/London",
      permissions: ["geolocation"],
    });

    await context.setGeolocation({ latitude: 51.509865, longitude: -0.118092 });

    const logo = page.locator("xpath=//img[@alt='Google']");
    const searchField = page.locator("#APjFqb");

    await page.goto("http://www.google.com");
    await expect(logo).toBeVisible();
    await searchField.fill("Fashion stores");
    await searchField.press("Enter");
  });
});
