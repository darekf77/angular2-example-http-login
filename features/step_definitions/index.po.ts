import { Bs4BreakPoint } from 'ng2-encrm-components';


import { Helpers } from '../support/helpers';
/**
 * IndexPageObject
 */
export class IndexPageObject {

  baseUrl = `${browser.params.baseUrl}${Helpers.urlPrefix}`;
  dashboardUrl = `${this.baseUrl}/dashboard`;

  urls = {
    baseUrl: this.baseUrl,
    dashboard: this.dashboardUrl,
    logout: `${this.dashboardUrl}/logout`,
    addNewClient: `${this.dashboardUrl}/addnewclient/modal`,
    addNewClientNoModal: `${this.dashboardUrl}/addnewclient/form`,
    testClientBase: `${this.dashboardUrl}/client/`
  };

  setBrowserSizeSM = () => {
    let width = 660;
    let height = 900;
    return browser.driver.manage().window().setSize(width, height);
  };

  setBrowserSizeLG = () => {
    let width = 1200;
    let height = 900;
    return browser.driver.manage().window().setSize(width, height);
  };

  setBrowserSize(sizeUpTo: Bs4BreakPoint) {
    let width = 660;
    let height = 900;
    return browser.driver.manage().window().setSize(width, height);
  }

  loginIntoSystem = (): protractor.promise.Promise<{}> => {
    let defer = protractor.promise.defer<{}>();
    browser.get(this.urls.dashboard).then(() => {
      defer.fulfill();
    }, err => defer.reject());
    return defer.promise;
  }

  logoutFromSystem = () => {
    let defer = protractor.promise.defer<{}>();
    browser.get(this.urls.logout).then(() => {
      defer.fulfill({});
    }, () => defer.reject());
    return defer.promise;
  }
}
