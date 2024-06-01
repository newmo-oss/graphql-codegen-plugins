import { test, expect } from '@playwright/test';

test('get query and mutate', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByTestId("mutate-button").click()
  await expect(page.getByTestId("mutate-result")).toBeVisible();
});
