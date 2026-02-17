// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries:1,
  //workers:1,
  timeout:30*1000,  //Timeout for each test
  expect: {
    timeout:30*1000,  //Timeout for each assertion
  },
  reporter:'html', //generate html report
  use: {
    browserName:'chromium',
    headless:false,
    screenshot: 'only-on-failure', //off, on
    trace: 'on',  //off,on
    video: 'retain-on-failure',
  } 
});
