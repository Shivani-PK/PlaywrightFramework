const {test, expect, selectors} = require('@playwright/test');
const { request } = require('http');
const { only } = require('node:test');
const { text } = require('stream/consumers');


test('browser context playwright test',async ({browser})=> 
{
    
    const context=await browser.newContext(); //Creates a new browser context
    const page=await context.newPage();
    //page.route('**/*.{jpg,jpeg,png}',route=> route.abort());   //stop the call to reach browser

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    

    const userName=page.locator('#username');
    const password=page.locator('[type="password"]');
    const signIn=page.locator('#signInBtn');
    const cardTitles=page.locator(".card-body a");

    page.on('request',request=> console.log(request.url())); //listen for request calls event to coccur and print url
    page.on('response',response=> console.log(response.url(),response.status()));   //listen to response and print status code & URL

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

    console.log(await cardTitles.first() .textContent()); // gets first element in list
    console.log(await cardTitles.nth(1).textContent());   // gets nth element in list

    const allTitles=await cardTitles.allTextContents();

    console.log(allTitles);
    await page.pause();

});

