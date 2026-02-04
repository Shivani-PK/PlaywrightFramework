const {expect}=require('@playwright/test')
class CheckOutPage
{
    constructor(page)
    {
        this.page=page;
        this.cardCvv=page.locator(".field").filter({hasText:'CVV Code '}).locator('input');
        this.cardName=page.locator(".field").filter({hasText:'Name on Card '}).locator("input");
        this.country=page.locator("[placeholder*='Country']");
        this.dropdown= page.locator(".ta-results");
        this.userName=page.locator(".user__name [type='text']").first();
        this.submit=page.locator(".btnn:has-text('Place Order ')");
        this.orderConfirmationText=page.locator(".hero-primary");
        this.orderId=page.locator(".ng-star-inserted .em-spacer-1 .ng-star-inserted");
    }

    async enterCardDEtails(cardCvv,cardName)
    {
        await this.cardCvv.fill(cardCvv);
        await this.cardName.fill(cardName);
    }

    async searchAndSelectCountry(countryName)
    {
        await this.country.pressSequentially(countryName);  //    await this.country.type(vountry,{delay:100});
        await this.dropdown.waitFor();    
        
        const optionsCount=await this.dropdown.locator("button").count();
    
        for(let i=0;i<optionsCount;++i)
        {
            const text=await this.dropdown.locator("button").nth(i).textContent();

            if(text.trim().toLowerCase()===countryName.trim().toLowerCase())
            {   
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }    
    }

    async verifyUserName(userName)
    {
        expect(this.userName).toHaveText(userName);
    }
    async placeOrderAndGetOrderID()
    {
        await this.submit.click();
        await expect( this.orderConfirmationText).toHaveText(" Thankyou for the order. ");

        return  await this.orderId.textContent();

    } 
    
}

module.exports={CheckOutPage}