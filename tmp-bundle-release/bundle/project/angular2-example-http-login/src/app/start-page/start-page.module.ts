import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


import { TranslateModule } from 'ng2-translate';
import { Resource } from 'ng2-rest';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';


import { LoginComponent, LoginModalComponent } from './login';
import { LoginService } from './login/model/login.service';
import { SharedModule } from '../shared/shared.module';
import { StartPageComponent } from './start-page.component';

@NgModule({
    declarations: [
        StartPageComponent,
        LoginComponent,
        LoginModalComponent
    ],
    imports: [
        ModalModule,
        CommonModule,
        RouterModule,
        SharedModule,
        TranslateModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    providers: [LoginService, Resource],
    exports: [
        StartPageComponent,
        LoginComponent,
        LoginModalComponent
    ]
})
export class StartPageModule {

}