const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Q3: Performance Glitch User Purchase Flow', function() {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.saucedemo.com/');
  });

  after(async () => {
    await driver.quit();
  });

  it('should complete a purchase with performance glitch user', async () => {
    // Login
    await driver.findElement(By.id('user-name')).sendKeys('performance_glitch_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    // Reset App State
    await driver.findElement(By.id('react-burger-menu-btn')).click();
    await driver.wait(until.elementLocated(By.id('reset_sidebar_link')), 5000).click();
    await driver.findElement(By.id('react-burger-cross-btn')).click();

    // Filter by name Z to A
    await driver.findElement(By.css('.product_sort_container')).sendKeys('za');

    // Add first product to the cart
    await driver.findElement(By.css('.inventory_item:nth-child(1) .btn_primary')).click();

    // Navigate to checkout
    await driver.findElement(By.css('.shopping_cart_link')).click();
    await driver.findElement(By.id('checkout')).click();

    // Fill out checkout information
    await driver.findElement(By.id('first-name')).sendKeys('John');
    await driver.findElement(By.id('last-name')).sendKeys('Doe');
    await driver.findElement(By.id('postal-code')).sendKeys('12345');
    await driver.findElement(By.id('continue')).click();

    // Verify product name and total price
    const itemName = await driver.findElement(By.css('.inventory_item_name')).getText();
    expect(itemName).to.not.be.empty;
    const total = await driver.findElement(By.css('.summary_total_label')).getText();
    expect(total).to.contain('Total');

    // Finish purchase
    await driver.findElement(By.id('finish')).click();
    const successMsg = await driver.findElement(By.css('.complete-header')).getText();
    expect(successMsg).to.equal('THANK YOU FOR YOUR ORDER');

    // Reset App State and Logout
    await driver.findElement(By.id('react-burger-menu-btn')).click();
    await driver.wait(until.elementLocated(By.id('reset_sidebar_link')), 5000).click();
    await driver.findElement(By.id('logout_sidebar_link')).click();
  });
});
