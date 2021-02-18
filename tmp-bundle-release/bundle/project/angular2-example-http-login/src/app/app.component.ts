/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, Inject, ViewContainerRef } from '@angular/core';

import { TranslateService } from 'ng2-translate/ng2-translate';
import { Resource, MockingMode, EurekaConfig } from 'ng2-rest/ng2-rest';

import { AppState } from './app.service';
import { Log, Level } from 'ng2-logger/ng2-logger';
const log = Log.create('app component');


export enum ENDPOINTS {
    API
}


require('!style!css!bootstrap/dist/css/bootstrap.min.css');
require('!style!css!material-design-icons/iconfont/material-icons.css');

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('!raw!normalize.css'),
        require('!raw!../assets/css/animate.css'),
        require('!raw!../assets/css/typeahead.scss'),
        require('./app.component.scss')
    ],
    template: require('./app.component.html')
})
export class App {
    
    get name() {
        return this.appState.name;
    }
    
    viewContainerRef;

    constructor(private translate: TranslateService,
        public appState: AppState,
        viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        appState.name = 'Account'

        if ('production' === ENV) {
            Log.setProductionMode();
            Resource.map(ENDPOINTS.API.toString(), 'http://localhost:8080/api');
        } else {
            Resource.map(ENDPOINTS.API.toString(), 'http://localhost:8080/api');
        }


        if (!LIVE_BACKEND) {
            Resource.setMockingMode(MockingMode.MOCKS_ONLY);
            // if ('production' === ENV) {
            //     Resource.setUrlToDocsServerAndRecreateIt('http://localhost:3103', TITLE);
            // } else if (window.location.port !== '3000') {
            //     // QUICK FIX prevent api/save request on localhost:3000
            //     Resource.setUrlToDocsServerAndRecreateIt('http://localhost:3113');
            // }
        } else {
            Resource.setMockingMode(MockingMode.LIVE_BACKEND_ONLY);
        }

        let userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'pl';

        // this language will be used as a fallback when a translation
        // isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('pl');

    }

    ngOnInit() {
        log.d('Initial App State', this.appState.state);
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
