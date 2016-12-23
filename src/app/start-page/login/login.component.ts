import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Log, Level } from 'ng2-logger/ng2-logger';
const log = Log.create('bs4-table');
import { AppState } from '../../app.service';

import { LOGIN_STATE, LoginService, User } from './model';


@Component({
    selector: 'ecrm-login',
    template: require('./login.component.html'),
    styles: [require('./login.component.scss')]
})
export class LoginComponent implements OnInit {
    state: LOGIN_STATE = LOGIN_STATE.START;
    LOGIN_STATE = LOGIN_STATE;
    user: User = <User>{};
    isShaking = false;

    errorMsg: string = '';
    password: string = '';
    company: string = '';
    get name() {
        return this.appState.name;
    }
    
    @ViewChild('smModal') smModal: HTMLElement;

    constructor(private login: LoginService, private router: Router, private appState: AppState) {

    }

    ngOnInit() { }


    loginIntoSystem(password, username, companyName) {
        log.i('username', username)
        log.i('password', password)
        log.i('companyName', companyName)
        this.login.check({ username, password, companyName }).then(() => {
            this.router.navigateByUrl('/dashboard');
        }, (err) => {
            console.log('HELLO HERE', JSON.stringify(err))
            this.errorMsg = JSON.stringify(err);
            this.smModal['incorrectCredentials'] = true;
        })
    }

    shake() {
        this.isShaking = true;
        setTimeout(() => this.isShaking = false, 1000);
    }



}
