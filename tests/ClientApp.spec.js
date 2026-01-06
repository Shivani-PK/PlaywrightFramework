const {test, expect, selectors} = require('@playwright/test');
const { only } = require('node:test');


test.only('browser context playwright test',async ({page})=> 
{
    const productName="ZARA COAT 3"
    const products=page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("shisv@gmail.com");
    await page.locator("#userPassword").fill("@Test123");
    await page.locator("[value='Login'] ").click();

    //await page.waitForLoadState('networkidle');  wait until network comes to idle state -> 
    // means it waits until network renders all the data. it is discouraged since it is flaky
    await page.locator(".card-body b").first().waitFor();

    const titles= await page.locator(".card-body b").allTextContents(); // will retrieve the text of all contents 
    // inside the mentioned locator. since allTextContents() method doesn't have inbuilt wait mechanism,
    // we have to explicitly mention wait in the previous line. 
    
    console.log(titles);

    const count=await products.count();

    for(let i=0; i<count;++i)
    {
        if( await products.nth(i).locator("b").textContent() === productName)
        {
            // add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.pause();


    


    

});
