const {test, expect, selectors} = require('@playwright/test');
const {customtest} = require ('../testdata/test-base')
const { only } = require('node:test');
const {POManager}=require('../pageobjects/POManager');

//JSON-> string-> JS object - sometimes JSON might have encoding data, which cannot be converted into object using parse method.
// hence first convert JSON to string and then use parse method.
const dataset=JSON.parse(JSON.stringify(require('../testdata/ClientAppPOTestdata.json')));

for(const data of dataset)
{    
    test(`Client App Login for ${data.productName}`,async ({page})=> 
    {

        let orderId;

        const poManager=new POManager(page);

        const loginPage=poManager.getLoginPage();
        const dashboardPage=poManager.getDashboardPage();
        const cartPage=poManager.getCartPage();
        const checkOutPage=poManager.getCheckOutPage();
        const orderHistoryPage=poManager.geyOrderHistoryPage();

        await loginPage.goToURL();
        await loginPage.validLogin(data.userName,data.password);
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();
        await cartPage.verifyIsProductDisplayed(data.productName);
        await cartPage.CheckOut();
        await checkOutPage.enterCardDEtails(data.cardCvv,data.cardName);
        await checkOutPage.searchAndSelectCountry(data.countryName);
        await checkOutPage.verifyUserName(data.userName);
        orderId=await checkOutPage.placeOrderAndGetOrderID();
        await dashboardPage.navigateToOrders();
        await orderHistoryPage.viewOrder(orderId);
        expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

    });

}
    customtest(`Client App Login `,async ({page,testDataForOrder})=> 
    {

        let orderId;

        const poManager=new POManager(page);

        const loginPage=poManager.getLoginPage();
        const dashboardPage=poManager.getDashboardPage();
        const cartPage=poManager.getCartPage();
        const checkOutPage=poManager.getCheckOutPage();
        const orderHistoryPage=poManager.geyOrderHistoryPage();

        await loginPage.goToURL();
        await loginPage.validLogin(testDataForOrder.userName,testDataForOrder.password);
        await dashboardPage.searchProductAddCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();
        await cartPage.verifyIsProductDisplayed(testDataForOrder.productName);
        await cartPage.CheckOut();


    });

