import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';


import { TranslateModule } from 'ng2-translate';

import {
    FocusDirective,
    NoContent
} from './index';



@NgModule({
    declarations: [
        FocusDirective,
        NoContent
    ],
    imports:      [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2BootstrapModule
    ],
    providers:    [
        
    ],
    exports:      [
        
        FocusDirective,
        NoContent        
    ]

})
export class SharedModule {

}
