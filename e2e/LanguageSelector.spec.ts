import { test, expect } from '@playwright/test';

test('LanguageSelector component E2E test', async ({ page }) => {
  await page.goto('http://localhost:3000'); 

  const selectElement = await page.$('select'); 
  expect(selectElement).not.toBeNull(); 

  if (selectElement) {
    await selectElement.click();
    await selectElement.selectOption('fr');

    await page.waitForURL("http://localhost:3000/fr");

    const selectedOption = await page.$('select option:checked');

    const selectedOptionText = await selectedOption?.textContent() ?? null;

    expect(selectedOptionText?.trim()).toBe('Francais');
  }
});
