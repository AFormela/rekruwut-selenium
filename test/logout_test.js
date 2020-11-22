//Author: s17999
const assert = require("chai").assert;
const { By, until, Builder, Capabilities } = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  describe("Testing logout " + browser.getBrowserName(), async (done) => {
    before(async () => {
      driver = await new Builder().withCapabilities(browser).build();
    });

    it("Enter login page", async () => {
      await driver.get("http://rekruwut.pl/login");
    });

    it("Fill login and password", async () => {
      await driver
        .findElement(By.name("login"))
        .sendKeys("jakub.pilachowski@xle.pl");
      await driver.findElement(By.name("password")).sendKeys("JA18LaIor;");
      await driver.findElement(By.className("btn-primary")).click();
      await driver.sleep(1000);
    });

    it("Logout menu button should exist", async () => {
      assert.exists(await driver.findElement(By.linkText("Wyloguj")));
    });

    it("Logout should work", async () => {
      await driver.findElement(By.linkText("Wyloguj")).click();
      await driver.sleep(1000);
      assert.exists(await driver.findElement(By.linkText("Logowanie")));
    });

    after(async () => {
      await driver.quit();
    });
  });
};

testBrowser(Capabilities.chrome());
testBrowser(Capabilities.firefox());
testBrowser(Capabilities.edge());
