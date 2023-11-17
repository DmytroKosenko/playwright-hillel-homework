// set up three tests on the website https://www.guru99.com/
// mandatory steps - text input, clicking on a keyboard key, checking after actions
// each test has 10 steps

const { test, expect } = require("@playwright/test");

test.describe("Homework test suite", () => {
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

  test.skip("Website test 2", async ({ page }) => {});

  test.skip("Website test 3", async ({ page }) => {});
});
