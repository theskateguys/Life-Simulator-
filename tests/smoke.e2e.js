import { expect, test } from '@playwright/test';

test('title screen to setup flow to main gameplay', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Island Life/i);
  await expect(page.getByRole('heading', {name:'ISLAND LIFE'})).toBeVisible();
  await page.getByRole('button', {name:/New Life/}).click();

  await expect(page.getByRole('heading', {name:'This is your life story'})).toBeVisible();
  await page.getByRole('button', {name:/Choose Island/}).click();

  const jamaica = page.getByRole('button', {name:/Jamaica/});
  const jamaicaFlag = jamaica.getByRole('img', {name:'Jamaica flag'});
  await expect(jamaicaFlag).toBeVisible();
  expect(await jamaicaFlag.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  await jamaica.click();

  await expect(page.getByRole('heading', {name:'Choose Your Starting Point'})).toBeVisible();
  await page.getByRole('button', {name:/Middle Class/}).click();

  await expect(page.getByRole('heading', {name:'Start Your Story'})).toBeVisible();
  await page.getByPlaceholder("Type your character's name").fill('Smoke Tester');
  await page.getByRole('button', {name:/Begin in Jamaica/}).click();

  const game = page.locator('.story-shell');
  await expect(game).toBeVisible();
  await expect(game).toContainText('Smoke Tester');
  await expect(game).toContainText('Age 18 · Jamaica');
  await expect(game).toContainText('Recommended chapters');
});
