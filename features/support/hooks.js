const { Before, BeforeStep, AfterStep } = require("@cucumber/cucumber");
const {chromium} = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const { after } = require("node:test");

//before each scenario 
Before(async function () {
    const browser=await chromium.launch({headless:false});
    const context=await browser.newContext();
    this.page= await context.newPage();
    this.poManager=new POManager(this.page);    
});

//before each step
BeforeStep(async function () {
    //console.log("Before step hook");
});

AfterStep(async function ({result}) {
    //console.log("After step hook");
    if(result.status==="FAILED")
    {
        await this.page.screenshot({path:'screenshot.png',fullPage:true});
    }
});

//after each scenario
after(async function () {
    await this.page.close();
    await this.poManager.closeBrowser();
});

Before({tag:"@Regression"},async function () {
    //console.log("Before hook for regression"); 
});

Before({tag:"@Regression or @Smoke"},async function () {
    //console.log("Before hook for regression"); 
});