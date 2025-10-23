import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customers/components/customer-list.component';
import { CustomerFormComponent } from './customers/components/customer-form.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'new', component: CustomerFormComponent },
  { path: 'edit/:id', component: CustomerFormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
