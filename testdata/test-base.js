const base = require('@playwright/test');

exports.customtest=base.test.extend(
{
    testDataForOrder : {
    userName: "shisv@gmail.com",
    password: "@Test123",
    productName : "ADIDAS ORIGINAL",
    cardCvv : "123",
    cardName : "shivani",
    countryName : "India"
    }
}
)