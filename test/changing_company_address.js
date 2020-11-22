//Author: s17402
const assert = require("chai").assert;
const { By, until, Builder, Capabilities, Key, Actions } = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  describe("Changing company address " + browser.getBrowserName(), async (done) => {
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

    it("Change My Company info", async () => {
      await driver.findElement(By.className("btn-primary")).click();
      await driver.wait(until.elementLocated(By.name('city')));
      await driver.findElement(By.name('city')).sendKeys(Key.chord(Key.CONTROL, "a", Key.BACK_SPACE));
      await driver.findElement(By.name('city')).sendKeys('Gdynia');
      await driver.findElement(By.className("btn-primary")).click();
      await driver.sleep(2000);
    })

    it("Changes should be saved correctly", async () =>{
      const element = await driver.findElement(By.className("card-body"));
      const text = await element.getText();
      assert.include(text, "Gdynia");
    })

    after(async () => {
      await driver.quit();
    });
  });
};

testBrowser(Capabilities.chrome());
testBrowser(Capabilities.firefox());
testBrowser(Capabilities.edge());
