const {test,expect,request} = require("@playwright/test")

const loginPayLoad={userEmail: "shisv@gmail.com", userPassword: "@Test123"} //data you want to use in API post . you can get 
                                                                            //  it from network tab of inspection
const orderPayload={orders: [{country: "Canada", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
let token;
let orderId;
test.beforeAll(async ()=>
{
    //Login API
    const apiContext=await request.newContext();    // new contect of API
    const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayLoad
    })  // post -> give URl and data you want to post. then store the response

    await expect(( loginResponse).ok()).toBeTruthy();   // assertion to check if response is ok
    const loginResponseJson=await loginResponse.json(); // extract json of that reponse and store it
    token=loginResponseJson.token;  // retrieve token from the json 

    console.log(token);

    // Create Order API
    const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayload,
        headers: 
        {
                'Authorization': token,   
                'Content-Type' : 'application/json'
        }
    }
    )

    const orderResponseJson= await orderPayload.json();
    orderId=orderResponseJson.orders[0];

    console.log(orderResponseJson);
});

test.beforeEach(()=>
{


});

test.only('API testing',async ({page})=> 
{
    await page.addInitScript(value=>    // inserting toekn into browser's local storage. addInitScript used for executing custom
                                        //  Javascript in the contect of the page
    {
        window.localStorage.setItem('token',value);
    }, token );

    const email="shisv@gmail.com";
    const productName="ADIDAS ORIGINAL";
    await page.goto("https://rahulshettyacademy.com/client");
    //await page.waitForLoadState('networkidle');  wait until network comes to idle state -> 
    // means it waits until network renders all the data. it is discouraged since it is flaky

    const products=page.locator(".card-body");

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

// verify if order created is showing in history page
// precondition - create order

