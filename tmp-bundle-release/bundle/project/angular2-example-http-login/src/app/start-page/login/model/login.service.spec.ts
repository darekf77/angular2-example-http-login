import { DebugElement, Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpModule, JsonpModule, Http, Jsonp } from '@angular/http';

import { Resource, MockingMode } from 'ng2-rest/ng2-rest';

import { LoginService } from './login.service';
import { User } from './user';
import { ENDPOINTS } from '../../../app.component';

export function LoginSpecs() {



    describe('LoginService (inline template)', () => {

        let service: LoginService;


        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [LoginService, Resource], // declare the test component
                imports: [HttpModule, JsonpModule]
            });
            return inject([Resource, Http, Jsonp],
                (rest: Resource<ENDPOINTS, User, User[]>, http: Http, jp: Jsonp) => {
                    service = new LoginService(createResource(http, jp));
                })();
        });

        it('should send login request', async(() => {
            service.check({ username: 'aaa', password: 'ddd', companyName: 'MaDIFF' }).then(() => {
                expect(service.isLoggedIn()).toBeTruthy();
            })
        }));

        it('should not send login request', async(() => {
            service.check({ username: undefined, password: undefined, companyName: undefined }).then(() => { },
                () => expect(service.isLoggedIn()).toBeFalsy())
        }));

        it('should logout without problems', () => {
            service.logout();
            expect(service.isLoggedIn()).toBeFalsy();
        });

    });

}


function createResource(http, jp) {
    let rest = new Resource<ENDPOINTS, User, User[]>(http, jp);
    let url = 'https://somewhere.com';
    Resource.map(ENDPOINTS.API.toString(), url);
    Resource.setMockingMode(MockingMode.MOCKS_ONLY);
    rest.add(ENDPOINTS.API, 'authentication');
    return rest;
}