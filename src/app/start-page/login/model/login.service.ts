import { Inject, Injectable } from '@angular/core';

import { Resource } from 'ng2-rest/ng2-rest';
import { User } from './user';
import { ENDPOINTS } from '../../../app.component';
import { loginInController } from './mock';

@Injectable()
export class LoginService {

    private user: User;

    constructor(private rest: Resource<ENDPOINTS, User, User[]>) {
        this.rest.add(ENDPOINTS.API, 'authenticate', 'LOGIN');
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    logout() {
        this.user = undefined;
    }

    check( loginData: User, ): Promise<User> {
        
        return new Promise((resolve, reject) => {
            loginData.rememberMe = true;
            let h = this.rest.api(ENDPOINTS.API, 'authenticate', 'Check user password')
                .mock(require('./mock/login.mock.json'), 0, loginInController)
                .save(loginData)
                .subscribe((user) => {
                    this.user = user;
                    resolve(user);
                    h.unsubscribe();
                }, (err) => { 
                    reject(err); 
                    h.unsubscribe();
                });
        });
    }


}
