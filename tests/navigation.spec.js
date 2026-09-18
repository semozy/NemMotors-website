import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Set the cookie preference directly in local storage before navigating
  await page.addInitScript(() => {
    window.localStorage.setItem("nem-motors-cookie-preference", "all");
  });
});

test("Homepage loads correctly and has basic SEO", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/NEM Motors/);
  const heading = page.locator("h1");
  await expect(heading).toBeVisible();
});

test("404 Error page works", async ({ page }) => {
  const response = await page.goto("/deze-pagina-bestaat-zeker-niet");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("404");
});

test("Navigation works correctly on Desktop", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Aanbod");
  await expect(page).toHaveURL(/.*\/aanbod/);
  await expect(page.locator("h1")).toContainText("Vind uw volgende wagen.");
});

