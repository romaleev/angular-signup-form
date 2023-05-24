import { test, expect } from '@playwright/test';
import { t } from 'i18next';

test.describe('Register form end-to-end test', () => {
  test('should test required fields', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await page.locator('[id="register"]').click();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.required', { title: 'First Name' }) as string
      })
    ).toBeVisible();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.required', { title: 'Last Name' }) as string
      })
    ).toBeVisible();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.required', { title: 'Email' }) as string
      })
    ).toBeVisible();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.required', { title: 'Password' }) as string
      })
    ).toBeVisible();
  });

  test('should validate email', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await page.locator('#email').fill('a');

    await page.locator('[id="register"]').click();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.pattern', { title: 'Email' }) as string
      })
    ).toBeVisible();

    await page.locator('#email').fill('a@b.cd');

    await expect(page.locator('#email + .invalid-feedback')).toBeHidden();
  });

  test('should validate password', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await page.locator('#firstName').fill('a');
    await page.locator('#lastName').fill('b');
    await page.locator('#password').fill('ab');

    await page.locator('[id="register"]').click();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.minLength', { title: 'Password' }) as string
      })
    ).toBeVisible();

    await page.locator('#password').fill('abababab');

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.containName', { title: 'Password' }) as string
      })
    ).toBeVisible();

    await page.locator('#password').fill('cccccccc');

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.caseLetters', { title: 'Password' }) as string
      })
    ).toBeVisible();

    await page.locator('#password').fill('cccccccD');

    await expect(page.locator('#password + .invalid-feedback')).toBeHidden();
  });

  test('should submit valid form', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await page.locator('#firstName').fill('a');
    await page.locator('#lastName').fill('b');
    await page.locator('#email').fill('a@b.cd');
    await page.locator('#password').fill('cccccccD');

    await page.locator('[id="register"]').click();

    await expect(
      page.locator('#success', { hasText: t('registerForm.submitSuccess') as string })
    ).toBeVisible();
  });
});
