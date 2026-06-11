// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fakestore/);
});

test('navigate to products section', async ({ page }) => {
  await page.goto('/');

  // Click the products link.
  await page.getByRole('link', { name: /Products/ }).click();

  const productsList = page.getByRole('list', { name: /Products list/i });
  await expect(productsList).toBeVisible();
  await expect(productsList.getByRole('article')).toHaveCount(51);
});

test('should open the first product modal and use the carrousel', async ({ page }) => {
  await page.goto('/products');

  const firstProductTitle = /Stylish Red & Silver Over-Ear Headphones/i;

  const productsList = page.getByRole('list', { name: /Products list/i });
  const firstCard = productsList.getByRole('article').first();

  await expect(firstCard.getByRole('heading', { level: 3 })).toHaveText(firstProductTitle);

  // Click the product card
  await firstCard.click();

  const dialog = page.getByRole('dialog');

  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(firstProductTitle);

  const carrousel = page.getByRole('region', { name: /Product images carrousel/i });
  const prevButton = carrousel.getByRole('button', { name: /Previous slide/i });
  const nextButton = carrousel.getByRole('button', { name: /Next slide/i });
  const slide = carrousel.getByRole('group');

  await expect(carrousel).toBeVisible();

  // The initial state of the carrousel
  await expect(prevButton).not.toBeVisible();
  await expect(slide.getByRole('img')).toHaveAccessibleName(/Image 1/);

  // Click the "next slide" button of the carrousel
  await nextButton.click();
  await expect(slide.getByRole('img')).toHaveAccessibleName(/Image 2/);

  // Click the thumbnail of the third photo
  await carrousel.getByRole('button', { name: /See image 3/ }).click();
  await expect(nextButton).not.toBeVisible();
  await expect(slide.getByRole('img')).toHaveAccessibleName(/Image 3/);

  // Click the second tab of the carrousel
  await carrousel.getByRole('radio', { name: /Image 2/ }).check();
  await expect(slide.getByRole('img')).toHaveAccessibleName(/Image 2/);

  // Click the "prev slide" button of the carrousel
  await prevButton.click();
  await expect(prevButton).not.toBeVisible();
  await expect(slide.getByRole('img')).toHaveAccessibleName(/Image 1/);
});

test('should test the filters', async ({ page }) => {
  await page.goto('/products');

  const priceRegExp = /Price: \$(?:(?:1[5-9]|2\d)(?:\.\d{2})?|30(?:\.00)?)/i;

  await page.getByRole('button', { name: /Open filters/i }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  await dialog.getByRole('searchbox', { name: /Search product/i }).fill('red');
  await dialog.getByRole('textbox', { name: /Min/i }).fill('15');
  await dialog.getByRole('textbox', { name: /Max/i }).fill('30');

  const productsList = page.getByRole('list', { name: /Products list/i });
  const productCards = productsList.getByRole('article');
  await expect(productCards).toHaveCount(1);

  for (let card of await productCards.all()) {
    await expect(card.getByTestId('price')).toContainText(priceRegExp);
    await expect(card.getByRole('heading', { level: 3 })).toContainText(/red/i);
  }
});
