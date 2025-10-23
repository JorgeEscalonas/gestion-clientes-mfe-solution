import { Routes } from '@angular/router';
import { CUSTOMERS_ROUTES } from './customers/customers.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./customers/customers.component')
      .then(m => m.CustomersComponent),
    children: CUSTOMERS_ROUTES
  },
  {
    path: '**',
    redirectTo: ''
  },
];
