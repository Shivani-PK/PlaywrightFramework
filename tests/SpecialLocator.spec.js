import {test,expect} from '@playwright/test'

test( 'Playwright Special Locators',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc");
    await page.getByRole("button",{name: 'Submit'}).click();
    const bool=await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    expect(bool).toBeTruthy();
    await page.getByRole("link",{name:'Shop'}).click();

    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click(); 

});