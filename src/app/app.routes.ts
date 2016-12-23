// import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
// import { RouterConfig, Router } from '@angular/router';

// export let routes: RouterConfig = [
//     { path: '', component: StartPageComponent },
//     { path: 'login', component: StartPageComponent },
//     {
//         path: 'dashboard', component: DashboardComponent,
//         children: routesDashboard
//     },
//     { path: '**', component: NoContent }
// ];
//
//
//
// export const asyncRoutes: AsyncRoutes = {
//     // we have to use the alternative syntax for es6-promise-loader to grab the routes
//     // 'Detail': require('es6-promise-loader!./+detail'),
//     // 'Index': require('es6-promise-loader!./+detail'), // must be exported with detail/index.ts
// };
//
//
// // Optimizations for initial loads
// // An array of callbacks to be invoked after bootstrap to prefetch async routes
// export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
//     // asyncRoutes['Detail'],
//     // es6-promise-loader returns a function
// ];

import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page';
import { NoContent } from './shared/no-content';
import { DataResolver } from './app.resolver';
import { ModuleWithProviders } from '@angular/core';

// AngularClass
// import { provideWebpack } from '@angularclass/webpack-toolkit';
// import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';


export const ROUTES: Routes               = [
    {path: '', component: StartPageComponent},
    {path: 'login', component: StartPageComponent},
    {path: '**', component: NoContent}
];
export const appRoutingProviders: any[]   = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
