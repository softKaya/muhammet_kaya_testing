const { Builder, By, Key, until } = require("selenium-webdriver");
//const ltCapabilities = require("../capabilities");
const assert = require("assert");
const Mochawesome = require("mochawesome");
const should = require("chai").should();

describe("Planit Testing KAYA", function () {
    it("Test case 3:", async function () {
        //launching the browser
        let driver = await new Builder().forBrowser("firefox").build();

        //openning to the *Target website
        await driver.get("http://jupiter.cloud.planittesting.com/");

        //NAVIGATING TO SHOP PAGE
        await driver.findElement(By.xpath("//*[@id='nav-shop']/a")).click();
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) /////////////////  ----------------WAIT
        await delay(1000) /// waiting 1 second.

        //BUYING 2 STUFFED FROGS
        target1 = 2;   // Number of click for ***Stuffed Frog 
        for(i=0;i<target1;i++){
            await driver.findElement(By.xpath("//li[2]/div/p/a")).click();
        }

        //BUYING 5 FLUFFY BUNNIES
        target2 = 5;   // Number of click for ***Fluffy Bunny 
        for(i=0;i<target2;i++){
            await driver.findElement(By.xpath("//*[@id='product-4']/div/p/a")).click();
        }
        //BUYING 3 VALANTINE BEARS
        target3 = 3   ;   // Number of click for ***Valentine Bear
        for(i=0;i<target3;i++){
            await driver.findElement(By.xpath("//*[@id='product-7']/div/p/a")).click();
        }

        //Assigning the prices of each product to variables for verification on the **Next(CART) page
        const price1 = await driver.findElement(By.xpath("//*[@id='product-2']/div/p/span")).getText();  //price of ***Stuffed Frog
        const price2 = await driver.findElement(By.xpath("//*[@id='product-4']/div/p/span")).getText();  //price of ***Fluffy Bunny
        const price3 = await driver.findElement(By.xpath("//*[@id='product-7']/div/p/span")).getText();  //price of ***Valentine Bear
                                                                //console.log(price1+' '+price2+' '+price3);

        //NAVIGATING TO CART PAGE
        await driver.findElement(By.xpath("//*[@id='nav-cart']/a")).click();
        const delay2 = ms => new Promise(resolve => setTimeout(resolve, ms)) /////////////////  ----------------WAIT
        await delay2(1000) /// waiting 1 second.

        //LOCATING THE PRICE OF EACH PRODUCT ON CART PAGE
        const new_price1 = await driver.findElement(By.xpath("//tbody/tr[1]/td[2]")).getText();  //price of ***Stuffed Frog
        const new_price2 = await driver.findElement(By.xpath("//tbody/tr[2]/td[2]")).getText();  //price of ***Fluffy Bunny
        const new_price3 = await driver.findElement(By.xpath("//tbody/tr[3]/td[2]")).getText();  //price of ***Valentine Bear
                                                               // console.log(new_price1+' '+new_price2+' '+new_price3);

        //VERIFYING THE PRICE OF EACH PRODUCT
        assert.strictEqual(price1, new_price1);
        assert.strictEqual(price2, new_price2);
        assert.strictEqual(price3, new_price3);

        //EXPECTED SUBTOTAL FOR EACH PRODUCT
        const subtotal_exp1 ="$" + (price1.substring(1))*2;       
        const subtotal_exp2 ="$" + (price2.substring(1))*5;
        const subtotal_exp3 ="$" + (price3.substring(1))*3;
                                                                //console.log(subtotal_exp1+' '+subtotal_exp2+' '+subtotal_exp3);
        
        //ACTUAL SUBTOTAL FOR EACH PRODUCT
        const subtotal_act1 = await driver.findElement(By.xpath("//tbody/tr[1]/td[4]")).getText();  //subtotal of ***Stuffed Frog
        const subtotal_act2 = await driver.findElement(By.xpath("//tbody/tr[2]/td[4]")).getText();  //subtotal of ***Fluffy Bunny
        const subtotal_act3 = await driver.findElement(By.xpath("//tbody/tr[3]/td[4]")).getText();  //subtotal of ***Valentine Bear
                                                                //console.log(subtotal_act1+' '+subtotal_act2+' '+subtotal_act3);
        
        //VERIFYING THE SUBTOTAL OF EACH PRODUCT
        assert.strictEqual(subtotal_exp1,subtotal_act1);
        assert.strictEqual(subtotal_exp2,subtotal_act2);
        assert.strictEqual(subtotal_exp3,subtotal_act3);

        //VERIFYING THE TOTAL
        const total_exp = "Total: " + ((price1.substring(1))*2 + (price2.substring(1))*5 + (price3.substring(1))*3);
        const total_act = await driver.findElement(By.xpath("//tfoot/tr[1]/td/strong")).getText();
        assert.strictEqual(total_exp,total_act);
                                                                //console.log(total_exp);   console.log(total_act);
     
        driver.quit();
    })
});
                          
