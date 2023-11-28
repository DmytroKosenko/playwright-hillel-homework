const { test, expect } = require("@playwright/test");

//test.describe.configure({ mode: "serial" }); //run test 1-by-1

test.describe.skip("Open Guru website", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.guru99.com/");
    // await page.goto("/");
  });

  test("Open the main page", async ({ page }) => {
    await expect(page.getByText("Tutorials Library")).toBeVisible();
  });

  test("Guru website test 1", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Tutorials Library" })
    ).toBeVisible();
    await page.getByRole("link", { name: "➤ SAP FICO" }).click();
    await expect(
      page.getByRole("heading", {
        name: "SAP FICO Training Course Tutorial: Learn SAP FI & CO Modules",
      })
    ).toBeVisible();
    await page.getByText("Knowledge of SAP.").click();
    await page.locator("#post-453").getByRole("link", { name: "SAP" }).click();
    await expect(
      page.getByRole("heading", { name: "SAP Tutorial Summary" })
    ).toBeVisible();
    await page.getByTitle("SAP Business Suite").click();
    await page
      .getByRole("heading", { name: "SAP Business Suite applications" })
      .click();
  });

  test.skip("Guru website test 2", async ({ page }) => {
    //xpath locators example
    //a[@href="/tensorflow-tutorial.html"]
    //a[contains(text(),'➤ TensorFlow')]

    await page.locator("xpath=//a[contains(text(),'➤ TensorFlow')]").click();
    await expect(
      page.locator('xpath=//h2[contains(text(),"What is TensorFlow?")]')
    ).toBeVisible();
  });

  test.skip("Guru website test 3", async ({ page }) => {
    const linkNltk = page.locator("//a[contains(text(),'➤ NLTK')]");
    const articleAdded = page.locator("xpath=//time");
    const tutorialLink = page.locator(
      "//a[@title='How to Download & Install NLTK on Windows/Mac']//strong[contains(text(),'Tutorial')]"
    );
    const textHowToDownload = page.locator(
      "//h1[normalize-space()='How to Download & Install NLTK on Windows/Mac']"
    );

    await linkNltk.click();
    await expect(articleAdded).toContainText("September 30, 2023");
    await tutorialLink.click();
    textHowToDownload.waitFor({ state: "visible", timeout: 5000 }); //add an additinal timeout to wait element
    await expect(textHowToDownload).toBeVisible();
    //await expect(textWhatIsSeq).toBeVisible();
  });

  test.skip("Guru website test 4", async ({ page }) => {
    const textWhatIsSeq = page.locator(
      "//h4[normalize-space()='Search for your Favorite Course']"
    );
    const textWhatIsSeq_2 = page.locator(
      "//h4[normalize-space()='Search for your Favorite Course 2']"
    );

    if (await textWhatIsSeq_2.isVisible()) {
      await page.locator("non.visible.locator").click();
    }
    await expect(textWhatIsSeq).toBeVisible();
  });

  test("Guru website test 5", async ({ page }) => {
    // const context = await browser.newContext({ headless: true });
    // const page = await context.newPage();

    await page.mouse.up();
    await page.mouse.down();
    await page
      .locator("div.g-content")
      .screenshot({ path: "screenshots/header_with_search.png" });
    await expect(page).toHaveScreenshot("main_page_snapshot.png");
    const input = page.locator("input.gsc-input");

    await input.click();
    await input.fill("sap");
    await page.screenshot({
      path: "screenshots/sap_in_search_input_false.png",
      fullPage: false,
    }); //make a page screenshot
    await input.clear();
    await input.pressSequentially("S", "A", "P");
    await input.pressSequentially("T", "u", "t", "o", "r", "i", "a", "l", {
      delay: 200,
    });
    //await context.close();
  });
});
