import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("nem-motors-cookie-preference", "all");
  });
});

test("Favorites logic works via localStorage", async ({ page }) => {
  // We mock a car by just navigating to the inventory
  await page.goto("/aanbod");
  
  // Find the first favorite button on a car card (it's a heart icon)
  const favoriteButton = page.locator("button[aria-label*='toevoegen aan favorieten']").first();
  
  // Ensure we have cars
  if (await favoriteButton.isVisible()) {
    await favoriteButton.click();
    
    // Check local storage via context
    const favorites = await page.evaluate(() => window.localStorage.getItem("nem-motors-favorites"));
    expect(favorites).toBeTruthy();
    expect(JSON.parse(favorites).length).toBeGreaterThan(0);
    
    // Verify it appears on the favorites page by clicking the heart icon in the header
    await page.click("header a[href='/favorieten']");
    await expect(page.locator("h1")).toContainText("Uw favoriete wagens");
    await expect(page.locator("h2").first()).toContainText("1 bewaarde wagen");
    
    // Check if the car card is visible on favorites page
    const card = page.locator("article").first();
    await expect(card).toBeVisible();
  }
});

