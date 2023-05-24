import i18n from 'i18next';
import i18nextConf from './i18next.config';

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  /* Maximum time one test can run for. */
  testDir: `./tests-e2e`,
  timeout: 60000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  retries: 0,
  workers: '75%',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'dist/playwright-report' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 5000,
    baseURL: 'http://localhost:4200',
    browserName: 'chromium',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
    trace: process.env['CI'] ? 'off' : 'on'
  },
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'dist/test-results/'
};

export default (async () => {
  await i18n.init(i18nextConf);
  return config;
})();
