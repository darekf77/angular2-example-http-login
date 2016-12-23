import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import {
    TranslateModule,
    TranslateLoader,
    TranslateStaticLoader
} from 'ng2-translate';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES, routing, appRoutingProviders } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState } from './app.service';

import { Ng2BootstrapModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { EnCRMComponentsModule } from 'ng2-encrm-components';
import { SharedModule } from './shared/shared.module';
import { StartPageModule } from './start-page/start-page.module';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DashboardModule } from './+dashboard/dashboard.module';


// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap:    [App],
    declarations: [App],
    imports:      [
        // import Angular's modules
        ModalModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot({
            provide:    TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps:       [Http]
        }),
        FormsModule,
        // third parties
        AgmCoreModule.forRoot(),
        EnCRMComponentsModule,
        Ng2BootstrapModule,
        // shared
        SharedModule,
        // content
        StartPageModule,
        // routing
        routing,
        DashboardModule
    ],
    providers:    [ // expose our Services and Providers into Angular's dependency injection
        ...ENV_PROVIDERS,
        ...APP_PROVIDERS,
        appRoutingProviders,
      {provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {
    }

    hmrOnInit(store) {
        if (!store || !store.state) return;
        console.log('HMR store', store);
        this.appState.state = store.state;
        delete store.state;
    }

    hmrOnDestroy(store) {
        let cmpLocation       = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        let state             = this.appState.state;
        store.state           = state;
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
