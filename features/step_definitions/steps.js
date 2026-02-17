const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');



Given('a login to Ecommerce app with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goToURL();
  await loginPage.validLogin(username, password);
});

When('add {string} to cart', async function (product) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage();

  await this.dashboardPage.searchProductAddCart(product);
  await this.dashboardPage.navigateToCart();
});


Then('verify {string} is displayed in cart', { timeout: 100 * 1000 }, async function (product) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poManager.getCartPage();

  await cartPage.verifyIsProductDisplayed(product);
  await cartPage.CheckOut();

});

When('enter valid details and place order', async function () {
  // Write code here that turns the phrase above into concrete actions
  const checkOutPage = this.poManager.getCheckOutPage();

  await checkOutPage.enterCardDEtails("1234", "shivani");
  await checkOutPage.searchAndSelectCountry("India");
  //await checkOutPage.verifyUserName(data.userName);
  this.orderId = await checkOutPage.placeOrderAndGetOrderID();
});

Then('verify order is present in order history', async function () {
  // Write code here that turns the phrase above into concrete actions
  const orderHistoryPage = this.poManager.geyOrderHistoryPage();

  await this.dashboardPage.navigateToOrders();
  await orderHistoryPage.viewOrder(this.orderId);
  expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});

Given('a login to Ecommerce2 app with {string} and {string}', async function (enteredUsername, enteredPassowrd) {
  const userName = this.page.locator('#username');
  const password = this.page.locator('[type="password"]');
  const signIn = this.page.locator('#signInBtn');

  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill(enteredUsername);
  await password.fill(enteredPassowrd);
  await signIn.click();
});

Then('Verify Error message is displayed', async function () {
  console.log(await this.page.locator('[style*="block"]').textContent());
  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});
