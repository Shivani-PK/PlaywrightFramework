class APIUtils
{
    constructor(apiContext,loginPayLoad)    // constructor to inilialise apicontext and login info
    {
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;
    }

    async getToken()
    {
        //Login API
        const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        })  // post -> give URl and data you want to post. then store the response
    
        const loginResponseJson=await loginResponse.json(); // extract json of that reponse and store it
        const token=loginResponseJson.token;  // retrieve token from the json 
    
        //console.log(token);    
        return token;
    }

    async  createOrder(orderPayload)
    {
        let response={};    // object to return orderID and token to main class
        response.token=await this.getToken();   // create new preportly called token on response object 
        const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: 
            {
                    'Authorization': response.token,   
                    'Content-Type' : 'application/json'
            }
        }
        )

        const orderResponseJson= await orderResponse.json();
        let orderId=orderResponseJson.orders[0];
        response.orderId=orderId;
        return response;
    }
}

module.exports={APIUtils}   // exporting module so that main class can use it