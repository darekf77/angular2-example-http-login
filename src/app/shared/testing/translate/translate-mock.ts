import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ModuleWithProviders } from '@angular/core';

export class TranslateMock {

    static get(): ModuleWithProviders {
        return TranslateModule.forRoot({
            provide:    TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps:       [Http]
        });
    }
}
