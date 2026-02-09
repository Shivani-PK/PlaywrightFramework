import { test, expect, selectors } from '@playwright/test';


test('browser context playwright test',async ({page})=> 
{
    const productName="ADIDAS ORIGINAL"
    const products=page.locator(".card-body");
    const email="shisv@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("@Test123");
    await page.getByRole("button",{name:'Login'}).click();

    //await page.waitForLoadState('networkidle');  wait until network comes to idle state -> 
    // means it waits until network renders all the data. it is discouraged since it is flaky
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"}).getByRole("button",{name:" Add To Cart"}).click();


    await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();

    await page.locator("div li").first().waitFor();

    await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

    await page.getByRole("button",{name:'Checkout'}).click();
        
    
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

    await page.getByText("Place Order ").click();

    await expect( page.getByText(" Thankyou for the order. ")).toHaveText(" Thankyou for the order. ");

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
