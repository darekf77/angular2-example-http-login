import { Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

export class RouteMock {
    getProvide(): {provide: any, useValue: Params} {
        return {
            provide: Router,
            useValue: {
                params: Observable.of({}),
                events: Observable.of({}),
                /*events: {
                    subscribe: () => {
                        return Observable.of({});
                    }
                },*/
                url: '/',
                parseUrl: (v) => {
                    return v;
                },
                serializeUrl: (v) => {
                    return v;
                }
            }
        };
    }
}
