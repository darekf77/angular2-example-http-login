import { Inject, Injectable } from '@angular/core';

import { Resource } from 'ng2-rest/ng2-rest';
import { User } from './user';
import { ENDPOINTS } from '../../../app.component';
import { loginInController } from './mock';

@Injectable()
export class LoginService {

    private user: User = <User>{};

    constructor(private rest: Resource<ENDPOINTS, User, User[]>) {
        this.rest.add(ENDPOINTS.API, 'users', 'LOGIN');
    }

    getLoggedInUser(): User {
        return this.user;
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    logout() {
        this.user = undefined;
    }



    check( loginData: User, ): Promise<User> {
        
        return new Promise((resolve, reject) => {
            this.rest.api(ENDPOINTS.API, 'users', 'Check user password')
                .mock(require('./mock/login.mock.json'), 0, loginInController)
                .save(loginData)
                .subscribe((user) => {
                    this.user = user;
                    resolve(user);
                }, (err) => { 
                    console.log('I AM REJECTED')
                    reject(err); 
                });
        });
    }


}
