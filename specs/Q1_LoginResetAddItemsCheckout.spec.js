const { expect } = require('chai');

describe('SauceDemo Login Tests', () => {
    it('should display an error message when trying to log in with locked_out_user', async () => {
      
        await browser.url('https://www.saucedemo.com/');

        const usernameInput = await $('#user-name');
        await usernameInput.setValue('locked_out_user');

        const passwordInput = await $('#password');
        await passwordInput.setValue('secret_sauce');

        const loginButton = await $('#login-button');
        await loginButton.click();

        const errorMessage = await $('.error-message-container');
        const errorText = await errorMessage.getText();

        expect(errorText).to.include('Sorry, this user has been locked out.');
    });

}); //Run
