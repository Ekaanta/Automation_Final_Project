const { expect } = require('chai');

describe('SauceDemo Purchase Flow Tests', () => {
    it('should log in, add items to the cart, and complete the purchase', async () => {
        try {
            await browser.url('https://www.saucedemo.com/inventory-item.html?id=5'); 
            const userNameInput = await $('#user-name');
            await userNameInput.waitForDisplayed({ timeout: 5000 });
            await userNameInput.setValue('standard_user');
            const passwordInput = await $('#password');
            await passwordInput.waitForDisplayed({ timeout: 5000 });
            await passwordInput.setValue('secret_sauce');
            const loginButton = await $('#login-button');
            await loginButton.waitForDisplayed({ timeout: 5000 });
            await loginButton.click();
            await (await $('#add-to-cart-Sauce-Labs-Fleece-Jacket')).click(); 
            

            const cartLink = await browser.$('a[href="/cart.html"]'); 
            await cartLink.waitForDisplayed({ timeout: 5000 });
            await cartLink.click();

            const productNames = await $$('div.inventory_item:Sauce_Labs_Fleece_Jacket');
            const actualProductNames = await Promise.all(
                productNames.map((product) => product.getText((Sauce_Labs_Fleece_Jacket)))
            );
            const expectedProducts = [
                'Sauce_Labs_Fleece_Jacket',
                
            ];
            expect(actualProductNames).to.deep.equal(expectedProducts);
            await (await $('#checkout')).click();
            await (await $('#first-name')).setValue('John');
            await (await $('#last-name')).setValue('Doe');
            await (await $('#postal-code')).setValue('12345');
            await (await $('#continue')).click();

            const totalPrice = await $('.summary_total_label');
            expect(await totalPrice.getText()).to.include('Total: $');
            await (await $('#finish')).click();

            const confirmationMessage = await $('.complete-header');
            expect(await confirmationMessage.getText()).to.equal('Thank you for your order!');

            await (await $('#react-burger-menu-btn')).click();
            await (await $('#logout_sidebar_link')).click();

        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });
});
