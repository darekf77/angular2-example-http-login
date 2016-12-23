import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: 'dashboard',
    selector: 'dashboard',
    template: require('./dashboard.html'),
    styles: [require('./dashboard.scss')]
})
export class DashboardComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}