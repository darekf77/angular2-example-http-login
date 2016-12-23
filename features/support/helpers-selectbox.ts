
export let select = {
    getCurrentTextValue: (selectBox: protractor.ElementFinder) => {
        let defer = protractor.promise.defer<string>();
        selectBox.getAttribute('ng-reflect-model').then(id => {
            // console.log('ng-reflect-model', id)
            selectBox.all(by.css(`option[value="${id}"]`)).getInnerHtml().then(html => {
                // console.log('inner html', html);
                let res = html.join().trim()
                // console.log('res', res);
                // console.log('res typeof', typeof res);
                defer.fulfill();
            }, () => defer.reject(`no option with id = "${id}" from select`));
        }, () => defer.reject('no angular2 model id on select'));
        return defer;
    },

    getCurrentValue: (selectBox: protractor.ElementFinder) => {
        let defer = protractor.promise.defer<number>();
        selectBox.getAttribute('ng-reflect-model').then(id => {
            defer.fulfill(parseInt(id, 2));
        }, () => defer.reject('no angular2 model id on select'));
        return defer;
    },

    getCurrentOptionValues: (selectBox: protractor.ElementFinder) => {
        let defer = protractor.promise.defer<number[]>();
        selectBox.all(by.tagName('option')).getAttribute('value').then(values => {

            let res = [];
            values.forEach(v => {
                let parsed = Number(v);
                res.push(parsed);
            });
            defer.fulfill(res);
        });
        return defer;
    },

    setTextValueOtherThanCurrent: (selectBox: protractor.ElementFinder) => {
        let defer = protractor.promise.defer<void>();
        select.getCurrentValue(selectBox).then(currentId => {
            // console.log('currentId', currentId)
            // console.log('currentId type', typeof currentId)

            select.getCurrentOptionValues(selectBox).then(valuesIds => {

                // console.log('valuesIds', valuesIds)
                // console.log('valuesIds type', typeof valuesIds)

                if (valuesIds.length < 2) {
                    defer.reject('SelectBox should have at least 2 options');
                    return false;
                }
                let notCurrendId;
                for (let i = 0; i < valuesIds.length; i++) {
                    if (valuesIds[i] != currentId) {
                        notCurrendId = valuesIds[i];
                        break;
                    }
                }
                if (notCurrendId === undefined) {
                    defer.reject('Incorrect not current selectbox id');
                    return false;
                }

                // console.log('notCurrendId', notCurrendId)
                // console.log('notCurrendId type', typeof notCurrendId)

                select.setNumberValue(selectBox, notCurrendId).then(() => {
                    defer.fulfill();
                });
            });

        })
        return defer;
    },

    setTextValue: (selectBox: protractor.ElementFinder, value: string) => {
        let defer = protractor.promise.defer<void>();
        selectBox.click().then(() => {
            let e = selectBox.all(by.cssContainingText('option', value)).get(0);
            e.click().then(() => defer.fulfill())
        })
        return defer;
    },

    setNumberValue: (selectBox: protractor.ElementFinder, id: number) => {
        let defer = protractor.promise.defer<void>();
        selectBox.click().then(() => {
            let e = selectBox.all(by.css(`option[value="${id}"]`)).get(0);
            e.click().then(() => defer.fulfill())
        })
        return defer;
    },

    countOptions: (selectBox: protractor.ElementFinder) =>
        selectBox.all(by.css(`option`)).count(),


    checkIfAtLeastOneOption: (selectBox: protractor.ElementFinder) => {
        let defer = protractor.promise.defer<boolean>();

        selectBox.all(by.css(`option`)).count().then(c => {
            if( c > 1 ) defer.fulfill(true);
            else defer.reject('No options on select');
        })
        return defer.promise;
    }

}