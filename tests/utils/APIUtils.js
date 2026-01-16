class APIUtils
{
    constructor(apiContext,loginPayLoad)
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
    
        console.log(token);    
        return token;
    }

    async  createOrder(orderPayload)
    {
        let response={};
        response.token=await this.getToken();
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

module.exports={APIUtils}