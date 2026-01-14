const {test,expect}=require ('@playwright/test')

test( "Popup validations",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();


    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#hide-textbox").click();

    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    await page.getByText("Top").click();

    const framePage=page.frameLocator("#courses-iframe");
    
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    const textCheck=await framePage.locator("div.content-side h2").textContent();

    const number=textCheck.split(" ")[1];
    console.log(number);
})