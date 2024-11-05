const { expect } = require('chai');

describe('SauceDemo Purchase Flow Tests', () => {
    it('should log in, add items to the cart, and complete the purchase', async () => {
        await browser.url('https://www.saucedemo.com/');

        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.click();
        const resetAppStateButton = await $('#reset_sidebar_link');
        await resetAppStateButton.click();

        await $('#add-to-cart-sauce-labs-backpack').click(); 
        await $('#add-to-cart-sauce-labs-bike-light').click(); 
        await $('#add-to-cart-sauce-labs-bolt-t-shirt').click(); 

        const cartButton = await $('#shopping_cart_container .shopping_cart_link');
        await cartButton.click();

        const productNames = await $$('div.inventory_item_name');
        const cartTotal = await $('.summary_total_label');

        const expectedProducts = [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
        ];
        const actualProductNames = await Promise.all(productNames.map(async (product) => await product.getText()));

        expect(actualProductNames).to.deep.equal(expectedProducts);

        const checkoutButton = await $('#checkout');
        await checkoutButton.click();

        await $('#first-name').setValue('John');
        await $('#last-name').setValue('Doe');
        await $('#postal-code').setValue('12345');
        await $('#continue').click();

        const totalPrice = await $('.summary_total_label');
        expect(await totalPrice.getText()).to.include('Total: $');

        const finishButton = await $('#finish');
        await finishButton.click();

        const confirmationMessage = await $('.complete-header');
        expect(await confirmationMessage.getText()).to.equal('Thank you for your order!');

        await menuButton.click();
        await resetAppStateButton.click();

        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();
    });
});
