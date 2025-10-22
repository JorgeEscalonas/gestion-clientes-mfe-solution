import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private customers = signal<Customer[]>([]);
  customers$ = computed(() => this.customers());

  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  loadCustomers() {
    this.http.get<Customer[]>(this.apiUrl).subscribe(data => this.customers.set(data));
  }

  addCustomer(customer: Customer) {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer);
  }
}
