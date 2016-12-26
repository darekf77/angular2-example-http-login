import { Helpers } from '../../support/helpers';
export class Login {

    urlBASE      = browser.params.baseUrl + Helpers.urlPrefix;
    urlLogin     = `${this.urlBASE}/login`;
    urlDashboard = `${this.urlBASE}/dashboard`;
    
    btShowModal = element(by.id('showModal'));
    modalBody = element(by.id('modalBody'));
    inputModalUsername = this.modalBody.all(by.css('[ng-reflect-name=username]')).get(0);
    inputModalPassword = this.modalBody.all(by.css('[ng-reflect-name=password]')).get(0);
    inputModalCompanyName = this.modalBody.all(by.css('[ng-reflect-name=companyName]')).get(0);
    btSiginIn = this.modalBody.all( by.tagName('button') ).get(0);
    btLogout = element(by.id('logoutButton'));

}
