import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { EnCRMComponentsModule } from 'ng2-encrm-components';

import { TranslateModule } from 'ng2-translate';

import {
    FocusDirective,
    NoContent,
    InputSelectComponent,
    InputDatePickerComponent,
} from './index';

import { TelephoneFormatterDirective, NumberFormatterDirective } from './input';

@NgModule({
    declarations: [
        FocusDirective,
        NoContent,
        InputSelectComponent,
        InputDatePickerComponent,
        TelephoneFormatterDirective,
        NumberFormatterDirective
    ],
    imports:      [
        CommonModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        EnCRMComponentsModule,
        Ng2BootstrapModule
    ],
    providers:    [
        
    ],
    exports:      [
        
        FocusDirective,
        NoContent,
        
        InputSelectComponent,
        InputDatePickerComponent,
    
        TelephoneFormatterDirective,
        NumberFormatterDirective,
        
    ]

})
export class SharedModule {

}
