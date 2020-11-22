//Author: s17999
const assert = require("chai").assert;
const { By, until, Builder, Capabilities } = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  describe("Testing password requirement in login " + browser.getBrowserName(), async (done) => {
    before(async () => {
      driver = await new Builder()
        .withCapabilities(browser)
        .build();
    });

    it("Enter login page", async () => {
        await driver.get("http://rekruwut.pl/login");
    });

    it("Fill login and no password", async () => {
        await driver.findElement(By.name("login")).sendKeys("kuba.pilach@gmail.com");
        await driver.findElement(By.className("btn-primary")).click();
        await driver.sleep(1000);
    })


    it("Error should exists and have correct text", async () => {
        const errorElement = await driver.findElement(By.className('invalid-feedback'));
        assert.exists(errorElement);

        if(errorElement) {
          const text = await errorElement.getText();
          assert.equal(text, "Hasło jest wymagane");
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
