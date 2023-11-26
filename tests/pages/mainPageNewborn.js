const { test, expect } = require("@playwright/test");

exports.MainPageNewborn = class MainPageNewborn {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.logoutLink = page.locator("li > a.waves-effect").nth(5);
  }

  async verifyLogoutVisible() {
    await expect(this.logoutLink).toBeVisible();
  }
};
