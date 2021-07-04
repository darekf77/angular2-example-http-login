import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Log, Level } from 'ng2-logger';
const log = Log.create('login-modal');

interface FormField {
    model?: Object,
    type?: string;
    name: string;
    placeholder: string;
}

@Component({
    moduleId: 'login-modal',
    selector: 'login-modal',
    template: require('./login-modal.component.html')
})
export class LoginModalComponent implements OnInit {

    @Input() modal: any = {};
    @Output() formSubmit: EventEmitter<{}> = new EventEmitter<{}>();

    constructor() { }

    ngOnInit() { }

    formFields: FormField[] = [
        { name: 'companyName', placeholder: 'Company name' },
        { name: 'username', placeholder: 'Username' },
        { name: 'password', placeholder: 'Password', type: 'password' }
    ]

    submit(formValues) {
        this.formSubmit.next(formValues);
    }

}