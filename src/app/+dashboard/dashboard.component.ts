import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../app.service';
import { LoginService } from '../start-page/login';

@Component({
    moduleId: 'dashboard',
    selector: 'dashboard',
    template: require('./dashboard.component.html'),
    styles: [require('./dashboard.component.scss')]
})
export class DashboardComponent implements OnInit {
    constructor(private login: LoginService, private router: Router) { }

    ngOnInit() {
        if(!this.login.isLoggedIn()) this.router.navigateByUrl('/');
    }

    get isLoggedIn () {
        return this.login.isLoggedIn();
    }

    logout() {
        this.login.logout();
        this.router.navigateByUrl('/login');
    }
}