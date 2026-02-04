const{test, expect, request} = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayLoad={userEmail: "shisv@gmail.com", userPassword: "@Test123"} 

let token;

test.beforeAll(async ()=>
{
    const apiContext=await request.newContext();    // new contect of API
    const apiUtils= new APIUtils(apiContext,loginPayLoad);
    token=await apiUtils.getToken();
})

test('Security test request intercept',async({page})=>
{
    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value);
    },token);
    
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='myorders']").click();
    //login and reach orders page
    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",route=>
    {
        route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=696fb069c941646b7aaa0e6'})    
        //route.continue -> continues route's request with optional overrides. here we have given url,
        // which means, when you encounter the API mentioned in 'page.route', continue with modified URL mentioned in the 'route.continue' 
        // method. here, we are modifying the API call url itself, means the response will be also of the modified url API call and not the 
        // actual API call url.
    }
    )

    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator("p.blink_me")).toHaveText("You are not authorize to view this order");


})