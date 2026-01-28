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

//screenshot 
test('Screenshot and visual comparison',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partial.png'}); //screenshot of the particular element

    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});    //take screenshot of the page

    await expect(page.locator("#displayed-text")).toBeHidden();
})

//Visual (comparison)
test.only('Visual testing',async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    expect(await page.screenshot()).toMatchSnapshot('landing.png')  // comparing expected screenshot with actual screenshot. 
                                                                    // since we have not hardcoded landing.png, first run will fail.
                                                                    // but that failed TC creates and stores a new landing.png which 
                                                                    // will act as base for comparison. so the next subsequent run,
                                                                    // landing.png will act as expected and actual will be provided
                                                                    // by running TC.
})