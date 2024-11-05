const { expect } = require('chai');

describe('SauceDemo Purchase Flow Tests', () => {
    it('should log in, add items to the cart, and complete the purchase', async () => {
        await browser.url('https://www.saucedemo.com/');
        await browser.pause(2000); 
        const userNameInput = await $('#user-name');
        if (!await userNameInput.isDisplayed()) {
            await userNameInput.waitForDisplayed({ timeout: 5000 });
        }
        await userNameInput.setValue('standard_user');

        const passwordInput = await $('#password');
        if (!await passwordInput.isDisplayed()) {
            await passwordInput.waitForDisplayed({ timeout: 5000 });
        }
        await passwordInput.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        if (!await loginButton.isDisplayed()) {
            await loginButton.waitForDisplayed({ timeout: 5000 });
        }
        await loginButton.click();
        const menuButton = await $('#react-burger-menu-btn');
        if (!await menuButton.isDisplayed()) {
            await menuButton.waitForDisplayed({ timeout: 5000 });
        }
        await menuButton.click();
        const resetAppStateButton = await $('#reset_sidebar_link');
        if (!await resetAppStateButton.isDisplayed()) {
            await resetAppStateButton.waitForDisplayed({ timeout: 5000 });
        }
        await resetAppStateButton.click();
        const backpackButton = await $('#add-to-cart-sauce-labs-backpack');
        if (!await backpackButton.isDisplayed()) {
            await backpackButton.waitForDisplayed({ timeout: 5000 });
        }
        await backpackButton.click();
        const bikeLightButton = await $('#add-to-cart-sauce-labs-bike-light');
        if (!await bikeLightButton.isDisplayed()) {
            await bikeLightButton.waitForDisplayed({ timeout: 5000 });
        }
        await bikeLightButton.click();
        const boltShirtButton = await $('#add-to-cart-sauce-labs-bolt-t-shirt');
        if (!await boltShirtButton.isDisplayed()) {
            await boltShirtButton.waitForDisplayed({ timeout: 5000 });
        }
        await boltShirtButton.click();
        const cartButton = await $('#shopping_cart_container .shopping_cart_link');
        if (!await cartButton.isDisplayed()) {
            await cartButton.waitForDisplayed({ timeout: 5000 });
        }
        await cartButton.click();
        const productNames = await $$('div.inventory_item_name');
        const expectedProducts = [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
        ];
        const actualProductNames = await Promise.all(productNames.map(async (product) => await product.getText()));

        expect(actualProductNames).to.deep.equal(expectedProducts);

        const checkoutButton = await $('#checkout');
        if (!await checkoutButton.isDisplayed()) {
            await checkoutButton.waitForDisplayed({ timeout: 5000 });
        }
        await checkoutButton.click();

        const firstNameInput = await $('#first-name');
        if (!await firstNameInput.isDisplayed()) {
            await firstNameInput.waitForDisplayed({ timeout: 5000 });
        }
        await firstNameInput.setValue('John');

        const lastNameInput = await $('#last-name');
        if (!await lastNameInput.isDisplayed()) {
            await lastNameInput.waitForDisplayed({ timeout: 5000 });
        }
        await lastNameInput.setValue('Doe');

        const postalCodeInput = await $('#postal-code');
        if (!await postalCodeInput.isDisplayed()) {
            await postalCodeInput.waitForDisplayed({ timeout: 5000 });
        }
        await postalCodeInput.setValue('12345');

        const continueButton = await $('#continue');
        if (!await continueButton.isDisplayed()) {
            await continueButton.waitForDisplayed({ timeout: 5000 });
        }
        await continueButton.click();

        const totalPrice = await $('.summary_total_label');
        if (!await totalPrice.isDisplayed()) {
            await totalPrice.waitForDisplayed({ timeout: 5000 });
        }
        expect(await totalPrice.getText()).to.include('Total: $');

        const finishButton = await $('#finish');
        if (!await finishButton.isDisplayed()) {
            await finishButton.waitForDisplayed({ timeout: 5000 });
        }
        await finishButton.click();

        const confirmationMessage = await $('.complete-header');
        if (!await confirmationMessage.isDisplayed()) {
            await confirmationMessage.waitForDisplayed({ timeout: 5000 });
        }
        expect(await confirmationMessage.getText()).to.equal('Thank you for your order!');

        await menuButton.click();
        if (!await resetAppStateButton.isDisplayed()) {
            await resetAppStateButton.waitForDisplayed({ timeout: 5000 });
        }
        await resetAppStateButton.click();

        const logoutButton = await $('#logout_sidebar_link');
        if (!await logoutButton.isDisplayed()) {
            await logoutButton.waitForDisplayed({ timeout: 5000 });
        }
        await logoutButton.click();
    });
});

