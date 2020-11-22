//Author: s17402
const assert = require("chai").assert;
const { By, until, Builder, Capabilities } = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  let addingAccountEmail = '';
  describe("Adding recruiter " + browser.getBrowserName(), async (done) => {
    before(async () => {
      driver = await new Builder().withCapabilities(browser).build();
    });

    it("Enter login page", async () => {
      await driver.get("http://rekruwut.pl/login");
    });

    it("Fill login and password", async () => {
      await driver
        .findElement(By.name("login"))
        .sendKeys("s17402@pjwstk.edu.pl");
      await driver.findElement(By.name("password")).sendKeys("Rekruola12!");

      await driver.findElement(By.className("btn-primary")).click();
      await driver.sleep(1000);
    });

    it("Enter My Recruters Info", async () => {
      await driver.get("http://rekruwut.pl/employees");
      await driver.wait(until.elementLocated(By.className("btn-cta")));
    });

    it("Creating new Recruiter", async () => {
      await driver.findElement(By.className("add-recruiter-btn")).click();
      await driver.wait(until.elementLocated(By.name("firstName")), 5000);

      const timestamp = Date.now();
      addingAccountEmail = "tk" + timestamp + "@rekruwut.pl";

      await driver.findElement(By.name("firstName")).sendKeys("Anna");
      await driver.findElement(By.name("lastName")).sendKeys("Kowalska");
      await driver
        .findElement(By.name("email"))
        .sendKeys(addingAccountEmail);
      
      
      await driver.findElement(By.name("password")).sendKeys("Magaviera28!");
      await driver
        .findElement(By.name("confirmPassword"))
        .sendKeys("Magaviera28!");
      await driver.findElement(By.className("btn-primary")).click();
      await driver.wait(until.elementLocated(By.className("recruiter-email")), 5000);
    });

    it("Recruiter should be added correctly", async () => {
      const recruiters = await driver.findElements(
        By.className("recruiter-email")
      );

      let emails = [];
      for (let i = 0; i < recruiters.length; i++) {
        const text = await recruiters[i].getText();
        emails.push(text);
      }

      assert.include(emails, addingAccountEmail);
    });

    after(async () => {
      await driver.quit();
    });
  });
};

testBrowser(Capabilities.chrome());
testBrowser(Capabilities.firefox());
testBrowser(Capabilities.edge());
