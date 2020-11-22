//Author: s17402
const assert = require("chai").assert;
const { By, until, Builder, Capabilities, Key, Actions } = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  describe("Changing company adress with blank field " + browser.getBrowserName(), async (done) => {
    before(async () => {
      driver = await new Builder()
        .withCapabilities(browser)
        .build();
    });

    it("Enter login page", async () => {
        await driver.get("http://rekruwut.pl/login");
    });

    it("Fill login and password", async () => {
        await driver.findElement(By.name("login")).sendKeys("s17402@pjwstk.edu.pl");
        await driver.findElement(By.name("password")).sendKeys("Rekruola12!");
        await driver.findElement(By.className("btn-primary")).click();
        await driver.sleep(1000);
    })

    it("Enter My Company info", async () => {
      await driver.get("http://rekruwut.pl/company");
      await driver.wait(until.elementLocated(By.className('btn-primary')));
    });

    it("Try edit company info with blank field", async () => {
      await driver.findElement(By.className("btn-primary")).click();
      await driver.wait(until.elementLocated(By.name('city')));

      let city = await driver.findElement(By.name('city')).getAttribute("value");

      for(let i = 0; i < city.length; i++) {
        await driver.findElement(By.name("city")).sendKeys(Key.BACK_SPACE);
      }

      await driver.findElement(By.name('city')).sendKeys(Key.TAB);
      await driver.sleep(2000);
    })

    it("Error should exists and have correct text", async () => {
      const errorElement = await driver.findElement(By.className('invalid-feedback'));
      assert.exists(errorElement);

      if(errorElement) {
        const text = await errorElement.getText();
        assert.equal(text, "Miasto jest wymagane");
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
