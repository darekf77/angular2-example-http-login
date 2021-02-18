
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page';
import { NoContent } from './shared/no-content';
import { DataResolver } from './app.resolver';
import { ModuleWithProviders } from '@angular/core';

export const ROUTES: Routes               = [
    {path: '', component: StartPageComponent},
    {path: 'login', component: StartPageComponent},
    {path: '**', component: NoContent}
];
export const appRoutingProviders: any[]   = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
