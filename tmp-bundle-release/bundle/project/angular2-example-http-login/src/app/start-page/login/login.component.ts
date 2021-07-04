import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Log, Level } from 'ng2-logger';
const log = Log.create('login');

import { AppState } from '../../app.service';
import { LoginService, User } from './model';


@Component({
    selector: 'login',
    template: require('./login.component.html'),
    styles: [require('./login.component.scss')]
})
export class LoginComponent implements OnInit {

    @Input() set openModal(v) {
        if (v) {
            log.i('show modal');
            this.modal.show();
        }
    }
    @ViewChild('modal') modal: any;

    constructor(private login: LoginService, private router: Router) { }

    ngOnInit() {
        if (this.login.isLoggedIn()) this.router.navigateByUrl('/dashboard');
    }

    loginIntoSystem(data) {
        let {password, username, companyName} = data;
        this.login.check({ username, password, companyName }).then(() => {
            this.router.navigateByUrl('/dashboard');
        }, (err) => {
            this.modal['incorrectCredentials'] = true;
        })
    }


}