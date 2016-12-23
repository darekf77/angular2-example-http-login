import { Component, OnInit } from '@angular/core';

import { AppState } from '../app.service';


@Component({
    moduleId: 'dashboard',
    selector: 'dashboard',
    template: require('./dashboard.component.html'),
    styles: [require('./dashboard.component.scss')]
})
export class DashboardComponent implements OnInit {
    constructor(private appState: AppState) { }

    get name() {
        return this.appState.name;
    }

    ngOnInit() { }
}