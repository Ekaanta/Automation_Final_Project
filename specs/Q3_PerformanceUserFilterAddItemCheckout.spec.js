const { expect } = require('chai');

describe('Q3: Performance Glitch User Purchase Flow', () => {
  before(async () => {
    await browser.url('https://www.saucedemo.com/');
  });

  it('should login, filter items, add to cart, checkout, and logout', async () => {
    
    await $('#user-name').setValue('performance_glitch_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();
    await $('.bm-burger-button').click();
    await $('#reset_sidebar_link').click();
    await $('.bm-cross-button').click();
    await $('.product_sort_container').selectByVisibleText('Name (Z to A)');
    await $$('.inventory_item .btn_inventory')[0].click();
    await $('.shopping_cart_link').click();
    await $('#checkout').click();
    await $('#first-name').setValue('John');
    await $('#last-name').setValue('Doe');
    await $('#postal-code').setValue('12345');
    await $('#continue').click();
    const itemName = await $('.inventory_item_name').getText();
    expect(itemName).to.exist;
    const totalPrice = await $('.summary_total_label').getText();
    expect(totalPrice).to.include('$');
    await $('#finish').click();
   
    const successMessage = await $('.complete-header').getText();
    expect(successMessage).to.equal('THANK YOU FOR YOUR ORDER');
    await $('.bm-burger-button').click();
    await $('#reset_sidebar_link').click();
    await $('#logout_sidebar_link').click();
  });
});
