import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from 'ng2-translate';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { HeaderComponent } from './header';
import { NoContent } from './index';

@NgModule({
    declarations: [        
        NoContent,
        HeaderComponent
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
        NoContent      ,
        HeaderComponent  
    ]

})
export class SharedModule {

}
