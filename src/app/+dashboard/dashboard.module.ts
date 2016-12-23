/* tslint:disable */

// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// third parties
import { PostalCodeValidatorDirective } from 'ng2-rest/ng2-rest';
import { TranslateModule } from 'ng2-translate';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { MomentModule } from 'angular2-moment';
import { AgmCoreModule } from 'angular2-google-maps/core';

// project imports
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { dashboardRouting } from './dashboard.routes';
import { DashboardDesktopComponent } from './desktop';

/* tslint:enable */

const COMPONENTS: any[] = [

    DashboardComponent,
    PostalCodeValidatorDirective,
    DashboardDesktopComponent
];

const PROVIDERS: any[] = [
   
];

@NgModule({
    imports:      [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        AgmCoreModule,
        TranslateModule,
        MomentModule,
        Ng2BootstrapModule,
        

        SharedModule,
        dashboardRouting

    ],
    exports:      [
        DashboardComponent
    ],
    declarations: [
        ...COMPONENTS
    ],
    providers:    [
        ...PROVIDERS
    ],
})
export class DashboardModule {
}
