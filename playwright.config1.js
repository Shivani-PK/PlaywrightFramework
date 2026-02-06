// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout:30*1000,  //Timeout for each test
  expect: {
    timeout:30*1000,  //Timeout for each assertion
  },
  reporter:'html',
  projects: [
    {
      name: 'safari execution',
      use: {
      browserName:'webkit',
      headless:true,
      screenshot: 'only-on-failure', //off, on
      trace: 'on',  //off,on
      //...devices['iPhone 11']
      }
    },
    {
      name: 'chrome execution',
      use: {
      browserName:'chromium',
      headless:false, // execution browser should be visible or not 
      screenshot: 'off', //off, on
      trace: 'on',  //generate trace/log -> off,on
      ignoreHTTPSErrors: true,  //ignore ssl errors
      video: 'retain-on-failure', // make video 
      permissions: ['geolocation'], //pop ups asking locations will be allowed
      //...devices['Kindle Fire HDX landscape'], // open the website in the mentioned device dimension
      //viewport: {width:720,height:720}
      }
    }
     
  ]
});
