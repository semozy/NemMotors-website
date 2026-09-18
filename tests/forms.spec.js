import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("nem-motors-cookie-preference", "all");
  });
});

test("Contact form validates and submits (mocked API)", async ({ page }) => {
  await page.goto("/contact");

  // Intercept the API call to prevent spamming the real database/email
  await page.route("**/api/requests/contact", async (route) => {
    const json = { success: true };
    await route.fulfill({ status: 201, json });
  });

  // Wait for Google Maps cookie overlay to be visible and accept cookies if needed to interact with form?
  // Form is below the map, we can interact directly.
  
  await page.fill("input[name='name']", "Test Gebruiker");
  await page.fill("input[name='email']", "test@example.com");
  await page.fill("textarea[name='message']", "Dit is een automatische test.");
  
  // Submit
  await page.click("button:has-text('Verstuur bericht')");
  
  // Wait for success message
  await expect(page.locator("text=Uw bericht is ontvangen.")).toBeVisible();
});

