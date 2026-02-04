const {test,expect,request} = require("@playwright/test")
const {APIUtils} = require('../utils/APIUtils');
// verify if order created is showing in history page
// precondition - create order

const fakePayLoadOrders={"data":[],"message":"No Orders"};
const loginPayLoad={userEmail: "shisv@gmail.com", userPassword: "@Test123"} //data you want to use in API post . you can get 
                                                                            //  it from network tab of inspection
const orderPayload={orders: [{country: "Canada", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
// let token;
// let orderId;

let response;
test.beforeAll(async ()=>
{
    //Login API
    const apiContext=await request.newContext();    // new contect of API
    const apiUtils=new APIUtils(apiContext,loginPayLoad);
    response=await apiUtils.createOrder(orderPayload);

});

test.only('Fake response API testing',async ({page})=> 
{
   
    await page.addInitScript(value=>    // inserting toekn into browser's local storage. addInitScript used for executing custom
                                        //  Javascript in the contect of the page
    {
        window.localStorage.setItem('token',value);
    }, response.token );


    await page.goto("https://rahulshettyacademy.com/client");
    

    // we have to tell playwright beofre clicking on myorders that when you hit that API, fake the response.
    // means before the click action, we should tell playwright whenever you encounter that API, fake the response.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",async route=>
    {
        //intercepting response - API response -> |{playwright fake response}| ->send to browser -> render data on front end
        const response= await route.fetch();    // fetching response 
        let body=JSON.stringify(fakePayLoadOrders); // fake response
        await route.fulfill(
            {
                response,
                body,
            }
        ) //fulfill method sends response from API response to browser. but we are sending fake response. 
        // fulfill metshod sends many elements lik response, header, API response and so on. if we dont send anything, by default whatever 
        // route has, it will give it to fulfill method. but here we are explicitly sending fake body. means it is overwriting with 
        // existing body. means we are injecting the body whatever we want to send.
    }
    ); 
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    // ^ wait until you get reponse of the get call

    await expect(page.locator(".mt-4")).toContainText(" You have No Orders to show at this time.");
});


 