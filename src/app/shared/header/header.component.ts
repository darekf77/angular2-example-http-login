import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
    moduleId: 'header',
    selector: 'header',
    template: require('./header.component.html'),
    styles: [require('./header.component.scss')]
})
export class HeaderComponent implements OnInit {

    @Output() loginIn: EventEmitter<{}> = new EventEmitter<{}>();
    @Output() logout: EventEmitter<{}> = new EventEmitter<{}>();
    @Input() isLoggedIn: boolean = false;

    constructor() { }

    @Input() name = 'Account'

    ngOnInit() { }
}