

import { Helpers } from './helpers';

type ElementFinder = protractor.ElementFinder;
type ElementArrayFinder = protractor.ElementArrayFinder;


let expect = Helpers.expect();


class TestHelper {

    private bs4widths = {
        xs: 300,
        sm: 650,
        md: 800,
        lg: 1050,
        xl: 1250
    };

    isDisplayed(element: ElementFinder, callback, expected = true) {
        expect(element.isDisplayed())
            .to.eventually.equal(expected)
            .and.notify(callback);
    }

    isPresent(element: ElementFinder, callback, expected = true) {
        expect(element.isPresent())
            .to.eventually.equal(expected)
            .and.notify(callback);
    }

    hasClass(element: ElementFinder, callback, expected: RegExp, expectedToHave = true) {
        if (expectedToHave) {
            expect(element.getAttribute('class'))
                .to.eventually.match(expected)
                .and.notify(callback);
        } else {
            expect(element.getAttribute('class'))
                .to.not.eventually.match(expected)
                .and.notify(callback);
        }
    }

    hasNElements(elements: ElementArrayFinder, callback, expected: number) {
        elements.then(theElements => {
            expect(theElements.length).to.equal(expected);
            callback();
        });
    }

    setBrowserBs4Width(callback, bs4width: string) {
        browser
            .driver
            .manage()
            .window()
            .setSize(this.bs4widths[bs4width], 900)
            .then(callback);
    }

}


export const testHelper = new TestHelper();
