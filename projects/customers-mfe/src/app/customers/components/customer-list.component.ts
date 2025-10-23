import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  constructor(
    public customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService.loadCustomers();
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['/', 'edit', customer.id]);
  }

  deleteCustomer(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      this.customerService.deleteCustomer(id);
    }
  }
}
