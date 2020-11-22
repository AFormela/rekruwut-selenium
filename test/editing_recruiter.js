//Author: s17402
const assert = require("chai").assert;
const {
  By,
  until,
  Builder,
  Capabilities,
  Key,
  Actions,
} = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  let editingEmail = '';

  describe("Editing recruiter " + browser.getBrowserName(), async (done) => {
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

    it("Enter My Recruters Info and click edit", async () => {
      await driver.get("http://rekruwut.pl/employees");
      await driver.wait(until.elementLocated(By.className("btn-cta")));

      const tbody = await driver.findElement(By.css("tbody"));
      const rows = await tbody.findElements(By.className("bg-white"));
      let editButton;
      for(let i = 1; i < rows.length; i++) {
        editButton = await rows[i].findElement(By.className("recruiter-edit-btn"));
        editingEmail = await rows[i].findElement(By.className('recruiter-email')).getText();
        break;
      }

      await editButton.click();
      await driver.wait(until.elementLocated(By.name('firstName')), 5000);
    });

    it("Editing Recruiter", async () => {
      await driver.sleep(500);
      let firstName = await driver.findElement(By.name('firstName')).getAttribute("value");

      for(let i = 0; i < firstName.length; i++) {
        await driver.findElement(By.name("firstName")).sendKeys(Key.BACK_SPACE);
      }
      await driver.findElement(By.name("firstName")).sendKeys("Alina");
      await driver.findElement(By.className("btn-primary")).click();
      await driver.sleep(1000);
      await driver.wait(until.elementLocated(By.css("tbody")), 10000);
    });

    it("Searched Recruiters have their name edited", async () => {
      const tbody = await driver.findElement(By.css("tbody"));
      const rows = await tbody.findElements(By.className("bg-white"));
      for(let i = 1; i < rows.length; i++) {
        const email = await rows[i].findElement(By.className('recruiter-email')).getText();

        if(editingEmail === email) {
          const name = await rows[i].findElement(By.className('recruiter-name')).getText();
          assert.equal(name, "Alina");
          break;
        }
      }
    });

    after(async () => {
      await driver.quit();
    });
  });
};

testBrowser(Capabilities.chrome());
testBrowser(Capabilities.firefox());
testBrowser(Capabilities.edge());

