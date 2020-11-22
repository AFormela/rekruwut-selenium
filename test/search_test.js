//Author: s17999
const assert = require("chai").assert;
const { By, until, Builder, Capabilities } = require("selenium-webdriver");
let driver;

const testBrowser = (browser) => {
  describe("Search box " + browser.getBrowserName(), async (done) => {
    before(async () => {
      driver = await new Builder()
        .withCapabilities(browser)
        .build();
    })

    it("Enter home page", async () => {
        await driver.get("http://rekruwut.pl/");
        await driver.wait(until.elementLocated(By.className('search-box-homepage')), 5000);
    })

    it("Search Prog in search box", async () => {
      await driver.findElement(By.className('search-box-homepage')).sendKeys("Prog");
      await driver.findElement(By.className('my-beautiful-button')).click();
      await driver.wait(until.elementLocated(By.name('position')), 5000);
    });

    it("Job position filter should be same as searching keyword", async () => {
        await driver.findElement(By.name('position')).getAttribute('value').then(text => {
            assert.equal(text, "Prog");
        });
    })

    it("Searched offers should have position name starting with searching key", async () => {
        const offerPossitions = await driver.findElements(By.className('position-name'));
        for (let i = 0; i < offerPossitions.length; i++) {
            const text = await offerPossitions[i].getText();
            assert.include(text, "Prog");
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
