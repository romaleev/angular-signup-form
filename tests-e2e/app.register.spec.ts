import { validUser } from '#src/mocks/index';
import { expect, test } from '@playwright/test';
import { t } from 'i18next';

test.describe('Register form end-to-end test', () => {
  test('should test required fields', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await page.locator('[id="register"]').click();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.required', { title: t('registerForm.firstName') }) as string
      })
    ).toBeVisible();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.required', { title: t('registerForm.lastName') }) as string
      })
    ).toBeVisible();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.required', { title: t('registerForm.email') }) as string
      })
    ).toBeVisible();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.required', { title: t('registerForm.password') }) as string
      })
    ).toBeVisible();
  });

  test('should validate email', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await page.locator('#email').fill('invalidEmail');

    await page.locator('[id="register"]').click();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.pattern', { title: t('registerForm.email') }) as string
      })
    ).toBeVisible();

    await page.locator('#email').fill(validUser.email);

    await expect(page.locator('#email + .invalid-feedback')).toBeHidden();
  });

  test('should validate password', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await page.locator('#firstName').fill(validUser.firstName);
    await page.locator('#lastName').fill(validUser.lastName);
    await page.locator('#password').fill('pass');

    await page.locator('[id="register"]').click();

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.minLength', { title: t('registerForm.password') }) as string
      })
    ).toBeVisible();

    await page.locator('#password').fill(`${validUser.firstName}${validUser.lastName}password`);

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.containName', { title: t('registerForm.password') }) as string
      })
    ).toBeVisible();

    await page.locator('#password').fill('password');

    await expect(
      page.locator('div.invalid-feedback', {
        hasText: t('errors.caseLetters', { title: t('registerForm.password') }) as string
      })
    ).toBeVisible();

    await page.locator('#password').fill(validUser.password);

    await expect(page.locator('#password + .invalid-feedback')).toBeHidden();
  });

  test('should submit valid form', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await page.locator('#firstName').fill(validUser.firstName);
    await page.locator('#lastName').fill(validUser.lastName);
    await page.locator('#email').fill(validUser.email);
    await page.locator('#password').fill(validUser.password);

    await page.locator('[id="register"]').click();

    await expect(
      page.locator('#success', { hasText: t('registerForm.submitSuccess') as string })
    ).toBeVisible();
  });
});
