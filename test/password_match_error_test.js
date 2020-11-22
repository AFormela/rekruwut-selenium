//Author: s17999
const assert = require("chai").assert;
const { By, until, Builder, Capabilities, Key } = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  describe("Testing password match error in register " + browser.getBrowserName(), async (done) => {
    before(async () => {
      driver = await new Builder()
        .withCapabilities(browser)
        .build();
    });

    it("Enter register page", async () => {
        await driver.get("http://rekruwut.pl/register");
    });

    it("Fill two other passwords", async () => {
        await driver.findElement(By.name("password")).sendKeys("JA18LaIor;");
        await driver.findElement(By.name("confirmPassword")).sendKeys("JA19LaIor;", Key.TAB);
        await driver.sleep(1000);
    })


    it("Error should exist and have correct text", async () => {
        const errorElement = await driver.findElement(By.className('invalid-feedback'));
        assert.exists(errorElement);

        if(errorElement) {
          const text = await errorElement.getText();
          assert.equal(text, "Hasła muszą się zgadzać");
        }
    })

    after(async () => {
      await driver.quit();
    });
  });
};

testBrowser(Capabilities.chrome());
testBrowser(Capabilities.firefox());
testBrowser(Capabilities.edge());
