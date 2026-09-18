import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("nem-motors-cookie-preference", "all");
  });
});

test.describe("Accessibility Checks", () => {
  test("Homepage should not have any automatically detectable accessibility issues", async ({ page }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    // We expect 0 violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

