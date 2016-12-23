import { Component, OnInit } from '@angular/core';
import { LoginComponent, LoginService } from './login';

@Component({
    selector: 'start-page',
    template: require('./start-page.component.html'),
    styles: [require('./start-page.component.scss')]
})
export class StartPageComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
