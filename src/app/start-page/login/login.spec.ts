import {
  inject,
  TestBed
} from '@angular/core/testing';
import { XHRBackend, HttpModule }
  from '@angular/http';
import { MockBackend,  } from '@angular/http/testing';

import { TranslateService, TranslateModule }  from 'ng2-translate/ng2-translate';

import { LoginService } from './model/login.service';
import { User } from './model/user';
import { LoginComponent } from './login.component';

export function SpecsLogin() {

  describe('Login Panel', () => {
    let d: Date, u: User;

    beforeEach(() => TestBed.configureTestingModule({
      imports:      [HttpModule, TranslateModule.forRoot()],
      declarations: [LoginComponent],
      providers:    [
        TranslateService,
        {provide: XHRBackend, useClass: MockBackend},
        LoginService
      ]
    }));


    it('should login in with correct password for user',
      inject([LoginService, TranslateService, MockBackend],
        (login: LoginService, translate: TranslateService, backend: MockBackend) => {
            

        }));



  });
}

