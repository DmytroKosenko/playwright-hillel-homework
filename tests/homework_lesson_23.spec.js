// set up three tests on the website https://www.guru99.com/
// mandatory steps - text input, clicking on a keyboard key, checking after actions
// each test has 10 steps

const { test, expect } = require("@playwright/test");

test.describe.configure({ mode: "serial" });

test.describe.skip("Homework test suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.guru99.com/");
  });

  test("Website test 1 (use codegen)", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Guru99 is totally new kind of learning experience.",
      })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Tutorials Library" })
    ).toBeVisible();

    await page.getByRole("link", { name: "Linux" }).first().click();
    await expect(
      page.getByRole("heading", {
        name: "UNIX / Linux Tutorial for Beginners: Learn Online in 7 days",
      })
    ).toBeVisible();

    await page
      .getByRole("cell", { name: "Linux vs Windows — What’s the Difference?" })
      .click();
    await page.getByRole("link", { name: "Linux vs Windows" }).click();
    await expect(
      page.getByRole("heading", {
        name: "Linux vs Windows: Key Difference Between Them",
      })
    ).toBeVisible();

    await page
      .getByLabel("Table of Contents", { exact: true })
      .locator("span")
      .click();
    await page.getByLabel("Expand Table of Contents").click();
    await page
      .locator("li")
      .filter({ hasText: "Windows Vs. Linux: File Name Convention" })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Windows Vs. Linux: File Name Convention",
      })
    ).toBeVisible();

    await page
      .getByRole("link", {
        name: "Unix vs Linux – What is Difference Between Them",
      })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Unix vs Linux – What is Difference Between Them",
      })
    ).toBeVisible();
  });

  test("Website test 2 (use const + xpath)", async ({ page }) => {
    const pageTitle = page.locator("//h3");
    const searchIcon = page.locator(
      "xpath=//span[@class='search-toggle-icon']//span[@class='kadence-svg-iconset']//*[name()='svg']"
    );
    const searchField = page.locator("//input[@placeholder='Search …']");
    const sortBySelector = page.locator("//div[@class='gsc-option-selector']");
    const dateSortOption = page.locator("//div[contains(text(),'Date')]");
    const firstLink = page.locator(
      "//div[@class='gs-title']//a[@class='gs-title'][contains(text(),'15 BEST Software')]"
    );

    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText(
      "Guru99 is totally new kind of learning experience."
    );
    await searchIcon.click();
    await searchField.fill("functional testing");
    await searchField.press("Enter");
    await expect(page).toHaveTitle("Search Results");
    await expect(page).toHaveURL(
      "https://www.guru99.com/search_gcse?q=functional+testing"
    );
    await sortBySelector.click();
    await expect(dateSortOption).toContainText("Date");
    await dateSortOption.click();
    await expect(firstLink).toContainText("15 BEST Software");
    await firstLink.click();
    await expect(page).toHaveURL(
      "https://www.guru99.com/software-testing-service-providers.html"
    );
  });

  test("Website test 3 (Just a test with sending email)", async ({ page }) => {
    const pageTitle = page.locator("//h3");
    const mobileTestingLink = page.locator(
      "//a[contains(text(),'➤ Mobile App Testing')]"
    );
    const mobileTestingPageTitle = page.locator("//h1");
    const emailInputField = page.locator("//input[@name='email']");
    const submitEmailButton = page.locator("//input[@name='submit']");
    const submitedEmailPageTitle = page.locator(
      "//h2[normalize-space()='Almost Done']"
    );

    await expect(pageTitle).toBeVisible();
    await expect(mobileTestingLink).toBeVisible();
    await mobileTestingLink.click();
    await expect(mobileTestingPageTitle).toBeVisible();
    await expect(mobileTestingPageTitle).toContainText(
      "Free Mobile App Testing Tutorial"
    );
    await page.evaluate(() => {
      window.scrollBy(0, 2000);
    });
    const mouse = page.mouse;
    await mouse.move(100, 200);

    await emailInputField.click();
    await emailInputField.fill("email30@dmytro.com");
    await expect(submitEmailButton).toBeVisible();
    await submitEmailButton.click();
    await expect(submitedEmailPageTitle).toBeVisible();
  });
});
