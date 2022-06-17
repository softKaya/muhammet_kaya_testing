const { Builder, By, Key, until } = require("selenium-webdriver");
//const ltCapabilities = require("../capabilities");
const assert = require("assert");
const Mochawesome = require("mochawesome");
const should = require("chai").should();

describe("Planit Testing KAYA", function () {
    it("Test case 2:", async function () {

        for(n=0;n<5;n++){       //  EXECUTING THIS TEST 5 TIMES !!!!!!!!!!!!!!
        
        //launching the browser
        let driver = await new Builder().forBrowser("firefox").build();

        //openning to the *Target website
        await driver.get("http://jupiter.cloud.planittesting.com/");

        //From home page navigating to *Contact page
        await driver.findElement(By.xpath("//*[@id='nav-contact']")).click();

        //----POPULATING MANDATORY FIELDS 
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) /////////////////  ----------------WAIT
        await delay(1000); /// waiting 1 second.
        await driver.findElement(By.id("forename")).sendKeys("Muhammet");
        await driver.actions().sendKeys(Key.chord(Key.TAB, Key.TAB,"john.example@planit.net.au")).perform();
        await driver.actions().sendKeys(Key.chord(Key.TAB, Key.TAB,"text area comment for Test 1")).perform();               

        //CLICKING ON SUBMIT BUTTON
        await driver.findElement(By.linkText("Submit")).click();

        //WAITING FOR THE NEXT PAGE
        let NewPageLoaded;
        do{
            NewPageLoaded = (await driver.findElements(By.xpath("//div[@class='alert alert-success']"))).length;
            const delay2 = ms => new Promise(resolve => setTimeout(resolve, ms)) /////////////////  ----------------WAIT
            await delay2(1000);

        }while(NewPageLoaded == 0);

        //VALIDATING SUCCESSFUL SUBMISSION MESSAGE
        let exp = "Thanks Muhammet, we appreciate your feedback."
        let act = await driver.findElement(By.xpath("/html/body/div[2]/div/div")).getText();
        assert.strictEqual(act, exp);
        
        driver.quit();
        }
    })
});
