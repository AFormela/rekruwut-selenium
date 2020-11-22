//Author: s17999
const assert = require("chai").assert;
const { By, until, Builder, Capabilities } = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  describe(
    "CV Generator Details Preview " + browser.getBrowserName(),
    async (done) => {
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

      it("Enter My CVS", async () => {
        await driver.get("http://rekruwut.pl/my-cvs");
        await driver.wait(until.elementLocated(By.name("name")), 5000);
      });

      it("Create new CV with name", async () => {
        await driver.findElement(By.name("name")).sendKeys("testoweCV");
        await driver.findElement(By.className("btn-cta")).click();
        await driver.wait(
          until.elementLocated(By.className("details-contact"))
        );
      });

      it("Enter city", async () => {
        await driver.sleep(500);
        await driver.findElement(By.className("details-contact")).click();
        await driver.wait(until.elementLocated(By.name("city")), 5000);
        await driver.findElement(By.name("city")).sendKeys("Gdańsk");
      });

      it("City on preview should be filled correcty", async () => {
        const element = await driver.findElement(By.className("contact-city"));
        const text = await element.getText();
        assert.equal(text, "Gdańsk");
      });

      after(async () => {
        await driver.quit();
      });
    }
  );
};

testBrowser(Capabilities.chrome());
testBrowser(Capabilities.firefox());
testBrowser(Capabilities.edge());
