class OrderHistoryPage
{
    constructor(page)
    {
        this.page=page;
        this.orderTable=page.locator("tbody");
        this.orderTableRow=page.locator("tbody tr");
        this.orderDetails=page.locator(".col-text");
    }

    // async viewOrder(orderId)
    // {
    //     await this.orderTable.waitFor();
        
    //     for(let i=0;i<await this.orderTableRow.count();++i)
    //     {
    //         const rowOrderId=await this.orderTableRow.nth(i).locator("ts").textContent();
    //         if(orderId.includes(rowOrderId))
    //         {
    //             await this.orderTableRow.nth(i).locator("button").first().click();

    //             break;
    //         }
    //     }
    // }
    async viewOrder(orderId) 
    {
        const cleanOrderId = orderId.replace(/\|/g, "").trim();

        const row = this.orderTableRow.filter({
        has: this.page.locator("th", { hasText: cleanOrderId })
        });

        await row.getByRole("button", { name: "View" }).click();
    } 

    async getOrderId()
    {
        await this.orderDetails.waitFor();
        return  await this.orderDetails.textContent();
    }

s
}
module.exports={OrderHistoryPage}