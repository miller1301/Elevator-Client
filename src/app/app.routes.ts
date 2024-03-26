import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/elevator/elevator.component').then(mod => mod.default)
    }
];
