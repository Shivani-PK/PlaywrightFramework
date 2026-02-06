// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout:40*1000,  //Timeout for each test
  expect: {
    timeout:40*1000,  //Timeout for each assertion
  },
  reporter:'html',
  use: {
    browserName:'chromium',
    headless:false,
    screenshot: 'only-on-failure', //off, on
    trace: 'on'  //off,on
  
  } 
  

});

