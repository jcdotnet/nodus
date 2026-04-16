import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'fleet',
        pathMatch: 'full'
      },
      {
        path: 'fleet',
        loadComponent: () =>
          import('./features/fleet/components/fleet-list/fleet-list')
            .then(m => m.FleetList)
      },
      {
        path: 'tracking',
        loadComponent: () => import('./features/tracking/components/live-map/live-map')
          .then(m => m.LiveMap)
      }
    ],
  }
];
