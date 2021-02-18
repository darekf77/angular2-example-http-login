import {
  inject,
  TestBed
} from '@angular/core/testing';

import {
  Http, BaseRequestOptions, ConnectionBackend, RequestOptions,
  HttpModule, XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { AppState } from './app.service';


import { SpecsShared } from './shared/shared.spec';
import { SpecsStartPage } from './start-page/start-page.spec';


import {
  TranslateService, TranslateLoader, TranslateStaticLoader, TranslateModule
}
  from 'ng2-translate/ng2-translate';
import { Resource } from 'ng2-rest/ng2-rest';
import { ApplicationRef, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppModule } from './app.module';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpModule, TranslateModule.forRoot(), RouterModule],
    declarations: [App],
    providers: [
      // Http,
      TranslateService,
      // MockBackend,
      // BaseRequestOptions,
      // RequestOptions,
      // ConnectionBackend,
      ViewContainerRef,
      AppState,
      App,
      { provide: XHRBackend, useClass: MockBackend }
    ]
  }));


  it('should have hook for modal purpose', inject([App], (app: App) => {
    expect(app.viewContainerRef).toBeDefined();
  }));

  it('should have a url', inject([App], (app: App) => {
    expect(app.name).toEqual('Account');
  }));

  SpecsShared();
  SpecsStartPage();
});
