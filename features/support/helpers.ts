import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');

import { select } from './helpers-selectbox';

export class Helpers {
    /**
     * URL prefix based on angular baseUrl param
     * @type {string}
     */
    static urlPrefix = '#';

    static getAdditionalErrorText = (lastRun) => {
        return 'Error:\n' + lastRun.error + '.\n' +
            'stderr:\n' + lastRun.stderr;
    };
  static select = select;

    static normalizeText = (text) => {
        return text.replace(/\033\[[0-9;]*m/g, '')
            .replace(/\r\n|\r/g, '\n')
            .replace(/^\s+/g, '')
            .replace(/\s+$/g, '')
            .replace(/[ \t]+\n/g, '\n')
            .replace(/\d+m\d{2}\.\d{3}s/, '<duration-stat>');
    };

    static expect = () => {
        chai.use(chaiAsPromised);
        return chai.expect;
    };

    static assert = () => {
        chai.use(chaiAsPromised);
        return chai.assert;
    };

    /**
     * Workaround problemu protractora cucumber framework nieczekającego aż element się pojawi.
     *
     * za: [źródło]{@link http://jaffamonkey.com/waiting-for-elements-to-appeardisappear-with-cucumberjsprotractor/}
     *
     * @param locator lokator elementu na który należy poczekać
     */
    static waitForElementToBePresent(locator: webdriver.Locator): webdriver.promise.Promise<webdriver.Locator> {
        let defer = protractor.promise.defer<webdriver.Locator>();
        let EC    = protractor.ExpectedConditions;
        let elem  = element(locator);
        browser.wait(EC.presenceOf(elem))
            .then(
                () => defer.fulfill(locator),
                () => defer.reject()
            );
        return defer.promise;
    }
}

export interface TableCucumber {
    // getType: () => string;
    rows: () =>  Array<string[]>;
    // rowsHash: [Function: rowsHash],
    // raw: [Function: raw],
    // hashes: [Function: hashes]
}
