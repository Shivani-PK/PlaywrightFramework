const {test,expect,request} = require("@playwright/test")
const {APIUtils} = require('./utils/APIUtils');
// verify if order created is showing in history page
// precondition - create order

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

    // const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    // {
    //     data:loginPayLoad
    // })  // post -> give URl and data you want to post. then store the response

    // await expect(( loginResponse).ok()).toBeTruthy();   // assertion to check if response is ok
    // const loginResponseJson=await loginResponse.json(); // extract json of that reponse and store it
    // token=loginResponseJson.token;  // retrieve token from the json 

    // console.log(token);

    // Create Order API
    // const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    // {
    //     data: orderPayload,
    //     headers: 
    //     {
    //             'Authorization': token,   
    //             'Content-Type' : 'application/json'
    //     }
    // }
    // )

    // const orderResponseJson= await orderResponse.json();
    // orderId=orderResponseJson.orders[0];

    // console.log(orderResponseJson);
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
    }, response.token );


    await page.goto("https://rahulshettyacademy.com/client");
    
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();

    const myOrder=  page.locator("tbody tr");

    for(let i=0;i<await myOrder.count();++i)
    {
        const myOrderId=await myOrder.nth(i).locator("th").textContent();
        if(response.orderId.includes(myOrderId))
        {
            await myOrder.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetails=await page.locator(".col-text").textContent();

    // await page.pause();
    expect(response.orderId.includes(orderDetails)).toBeTruthy();
});


 