const { test, expect } = require("@playwright/test");

//test.describe.configure({ mode: "serial" }); //run test 1-by-1

test.describe("Open Guru website", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.guru99.com/");
  });

  test.skip("Open the main page", async ({ page }) => {
    //await page.goto("https://www.guru99.com/");
    await expect(page.getByText("Tutorials Library")).toBeVisible();
  });

  test.skip("Guru website test 1", async ({ page }) => {
    //await page.goto("https://www.guru99.com/");

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
    //await page.goto("https://www.guru99.com/");

    //xpath locators example
    //a[@href="/tensorflow-tutorial.html"]
    //a[contains(text(),'➤ TensorFlow')]

    await page.locator("xpath=//a[contains(text(),'➤ TensorFlow')]").click();
    await expect(
      page.locator('xpath=//h2[contains(text(),"What is TensorFlow?")]')
    ).toBeVisible();
  });

  test.skip("Guru website test 3", async ({ page }) => {
    await page.goto("https://www.guru99.com/");

    const linkNltk = page.locator('a[href="/nltk-tutorial.html"]');
    const articleAdded = page.locator("xpath=//time");
    const textNltkSyllabus = page.locator(
      "xpath=//h2[text()='NLTK Tutorial Syllabus']"
    );
    const tutorialLink = page.locator("tr td a");
    const textWhatIsSeq = page.locator("//h2[text()='What is Seq2Seq?']");

    await linkNltk.click();
    await expect(articleAdded).toContainText("September 30, 2023");
    await textNltkSyllabus.press("Enter");
    await tutorialLink.nth(7).click();
    textWhatIsSeq.waitFor({ state: "visible", timeout: 5000 }); //add an additinal timeout to wait element
    await expect(textWhatIsSeq).toBeVisible();
    //await expect(textWhatIsSeq).toBeVisible();
  });

  test.skip("Guru website test 4", async ({ page }) => {
    const textWhatIsSeq = page.locator("//h2[text()='What is Seq2Seq?']");
    const textWhatIsSeq_2 = page.locator("//h2[text()='What is Seq2Seq 2?']");

    await page.goto("https://www.guru99.com/seq2seq-model.html");
    if (await textWhatIsSeq_2.isVisible()) {
      await page.locator("non.visible.locator").click();
    }
    await expect(textWhatIsSeq).toBeVisible();
  });

  test("Guru website test 5", async ({ browser }) => {
    const context = await browser.newContext({ headless: true });
    const page = await context.newPage();

    await page.goto("https://www.guru99.com/");
    await page.mouse.up();
    await page.mouse.down();
    const input = page.locator("input.gsc-input");

    await input.click();
    await input.fill("sap");
    await input.clear();
    await input.pressSequentially("S", "A", "P");
    await input.pressSequentially("T", "u", "t", "o", "r", "i", "a", "l", {
      delay: 200,
    });
    await context.close();
  });
});
