import { Component, OnInit } from '@angular/core';
import { LoginComponent, LoginService } from './login';
import { ClockDateComponent } from './clock-date';
import { BackgroundComponent } from './background';

@Component({
    selector: 'start-page',
    template: require('./start-page.component.html'),
    styles: [require('./start-page.component.scss')]
})
export class StartPageComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
