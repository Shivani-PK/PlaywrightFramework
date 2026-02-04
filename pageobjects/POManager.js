const {LoginPage}=require('./LoginPage');
const {DashBoardPage}=require('./DashBoardPage');
const {CartPage} = require('./CartPage');
const {CheckOutPage}=require('./CheckoutPage')
const{OrderHistoryPage}=require('./OrderHistoryPage')

class POManager
{
    constructor(page)
    {
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashboardPage= new DashBoardPage(this.page);
        this.cartPage=new CartPage(this.page);
        this.checkOutPage=new CheckOutPage(this.page);
        this.orderHistoryPage=new OrderHistoryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }
    getCartPage()
    {
        return this.cartPage;
    }
    getCheckOutPage()
    {
        return this.checkOutPage;
    }
    geyOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }

}
module.exports ={POManager};