import { Helpers } from '../../support/helpers';
export class Login {

    urlBASE      = browser.params.baseUrl + Helpers.urlPrefix;
    urlLogin     = `${this.urlBASE}/login`;
    urlDashboard = `${this.urlBASE}/dashboard`;
    // timeoutLogin = 1000;
    // imageAvatar  = element(by.id('login_avatar'));
    // logoEniro    = $('footer>a');

    btShowModal = element(by.id('showModal'));
    modalBody = element(by.id('modalBody'));
    inputModalUsername = this.modalBody.all(by.css('[name=login]')).get(0);
    inputModalPassword = this.modalBody.all(by.css('[name=password]')).get(0);
    inputModalCompanyName = this.modalBody.all(by.css('[name=company]')).get(0);
    btSiginIn = this.modalBody.all( by.tagName('button') ).get(0);
    btLogout = element(by.id('logoutButton'));

    // elementBoxLoginPassword      = element(by.tagName('ecrm-login-pass'));
    // elementBackground            = element(by.id('background'));
    // elementBoxClockDate          = element(by.tagName('ecrm-clock-date'));
    // elementIncorrectLoginMessage = element(by.id('incorrect_login_message'));

    // inputSetLogin = element(by.name('login'));
    // inputPassword = element(by.tagName('input'));

    // buttonLoginIn             = element(by.id('login_button'));
    // buttonNext                = element(by.buttonText('Dalej'));
    // buttonChangeWallpaperNext = element(by.css('button.right'));
    // buttonChangeWallpaperPrev = element(by.css('button.left'));

    // goToLoginPage = callback => {
    //     browser.get(this.urlLogin).then(() => callback());
    // };

    // passCorrectLogin = callback => {
    //     protractor.promise.all([
    //         this.inputSetLogin.isDisplayed(),
    //         this.inputSetLogin.sendKeys('aaa')
    //     ]).then(() => callback());
    // };

    // passIncorrectLogin = callback => {
    //     this.inputSetLogin.isDisplayed().then(() => {
    //         return this.inputSetLogin.sendKeys('incorrect login');
    //     }).then(() => callback());
    // };

    // passCorrectPassword = callback => {
    //     protractor.promise.all([
    //         this.inputPassword.isDisplayed(),
    //         this.inputPassword.sendKeys('ddd')
    //     ]).then(() => callback());
    // };

    // passIncorrectPassword = callback => {
    //     protractor.promise.all([
    //         this.inputPassword.isDisplayed(),
    //         this.inputPassword.sendKeys('incorrect password')
    //     ]).then(() => callback());
    // };

}
