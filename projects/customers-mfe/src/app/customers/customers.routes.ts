import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list.component';
import { CustomerFormComponent } from './components/customer-form.component';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'new',
    component: CustomerFormComponent
  },
  {
    path: 'edit/:id',
    component: CustomerFormComponent
  }
];
