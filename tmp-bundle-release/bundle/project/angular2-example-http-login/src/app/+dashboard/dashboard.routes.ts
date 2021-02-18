import {
    Routes, RouterModule
} from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardDesktopComponent } from './desktop';

const routesDashboard: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '', component: DashboardDesktopComponent, pathMatch: 'full'
            },
            {
                path: 'desktop', component: DashboardDesktopComponent
            }
        ]
    }
];
export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(routesDashboard);
