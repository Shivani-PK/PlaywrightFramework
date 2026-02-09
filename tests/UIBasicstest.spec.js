import { test, expect, selectors } from '@playwright/test';


test('@Web browser context playwright test',async ({browser})=> 
{
    
    const context=await browser.newContext(); //Creates a new browser context
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName=page.locator('#username');
    const password=page.locator('[type="password"]');
    const signIn=page.locator('#signInBtn');
    const cardTitles=page.locator(".card-body a");

    // css and xpath
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signIn.click();
    console.log(await page.locator('[style*="block"]').textContent());

    //assertion
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();

    console.log(await cardTitles.first().textContent()); // gets first element in list
    console.log(await cardTitles.nth(1).textContent());   // gets nth element in list

    const allTitles=await cardTitles.allTextContents();

    console.log(allTitles);



});

test  ('page playwright test',async ({page})=> 
{
    
    await page.goto("https://google.com");
    //get title- assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google"); 
    
});

test  ('UI controls',async ({page})=> 
{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator('#username');
    const password=page.locator('[type="password"]');
    const signIn=page.locator('#signInBtn');
    const dropdown= page.locator("select.form-control");
    const documentLink=page.locator("[href*='documents-request']");

    await dropdown.selectOption("consult");
    //await page.pause(); //playwright inspector
    
    await page.locator(".customradio").nth(1).click(); 
    await page.locator("#cancelBtn").click();
    await page.locator(".customradio").nth(1).click(); 
    await page.locator("#okayBtn").click();

    console.log(await page.locator(".customradio").nth(1).isChecked());   // returns boolean value
    await expect(page.locator(".customradio").nth(1)).toBeChecked();  //assertion

    await page.locator("#terms").click();
    await expect(await page.locator("#terms")).toBeChecked(); // checking if terms and conditions box is checked
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    //await signIn.click();

    
}); 

test('Child windows handling', async ({browser})=>
{
    const context=await browser.newContext(); 
    const page=await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink=page.locator("[href*='documents-request']");
    
    const [newPage]=await Promise.all(
    [context.waitForEvent('page'),   // listening to new page opened in background
    documentLink.click()
    ])

    const text=await newPage.locator(".red").textContent();
    console.log(text);

    const arrayText=text.split("@")
    const domain=arrayText[1].split(" ")[0]
    console.log(domain);

    await expect( newPage.locator(".red")).toContainText("Please email us at mentor@rahulshettyacademy.com with below template to receive response ");

    await page.locator('#username').fill(domain);
    // await page.pause();
    console.log(await page.locator('#username').inputValue());
});
