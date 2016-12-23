import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

export class ActivatedRouteMock {
    params: Params = {};

    setParams(value: Params) {
        this.params = value;
        return this;
    }

    // @todo: w razie konieczności ustawienie innych wlasciwosci np. "url" nalezy dodać kolejną met. set*()
    // ...

    getMock(): ActivatedRoute {
        return <ActivatedRoute>{
            url: null,
            params: Observable.of(this.params),
            data: null,
            outlet: null,
            snapshot: null
        };
    }

    getProvide(): {provide: any, useValue:  ActivatedRoute} {
        return {provide: ActivatedRoute, useValue:  this.getMock()};
    }
}
