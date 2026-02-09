import { test, expect, selectors } from '@playwright/test';

let webContext;
const email="shisv@gmail.com"

test.beforeAll(async ({browser})=>
{
    const context = await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("@Test123");
    await page.locator("[value='Login'] ").click();

    await page.waitForLoadState('networkidle'); 

    await context.storageState({path: 'state.json'});   // test level- json file created which will 
    // store content of the storage session

    webContext=await browser.newContext({storageState:'state.json'});    // creating new context and 
    // injecting storgae data into it
})


test('browser context playwright test 1',async ({})=> 
{
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    
    const productName="ADIDAS ORIGINAL"
    const products=page.locator(".card-body");

    await page.locator(".card-body b").first().waitFor();

    const titles= await page.locator(".card-body b").allTextContents(); // will retrieve the text of all 
    // contents inside the mentioned locator. since allTextContents() method doesn't have inbuilt wait 
    // mechanism, we have to explicitly mention wait in the previous line. 
    
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

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    
    await page.locator(".field").filter({hasText:'CVV Code '}).locator('input').fill("123");

    await page.locator(".field").filter({hasText:'Name on Card '}).locator("input").fill("Shivani");

    
    await page.locator("[placeholder*='Country']").pressSequentially("ind");

    const dropdown= page.locator(".ta-results");
    await dropdown.waitFor();    
    
    const optionsCount=await dropdown.locator("button").count();

    for(let i=0;i<optionsCount;i++)
    {
        const text=await dropdown.locator("button").nth(i).textContent();
        if(text.trim()==="India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }



    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.locator(".btnn:has-text('Place Order ')").click();

    await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId=  await page.locator(".ng-star-inserted .em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

   
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();

    const myOrder= await page.locator("tbody tr");

    for(let i=0;i<await myOrder.count();++i)
    {
        const myOrderId=await myOrder.nth(i).locator("th").textContent();
        if(orderId.includes(myOrderId))
        {
            await myOrder.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetails=await page.locator(".col-text").textContent();
    expect(orderId.includes(orderDetails)).toBeTruthy();
});

test('@API Test case 2',async()=>
{

    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    
    const productName="ADIDAS ORIGINAL"
    const products=page.locator(".card-body");

    await page.locator(".card-body b").first().waitFor();

    const titles= await page.locator(".card-body b").allTextContents();
    
    console.log(titles);
})
