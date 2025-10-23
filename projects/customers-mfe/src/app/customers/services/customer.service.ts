import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { computed } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private customers = signal<Customer[]>([]);
  customers$ = computed(() => this.customers());

  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {
    this.loadCustomers();
  }

  loadCustomers() {
    this.http.get<Customer[]>(this.apiUrl).subscribe({
      next: data => this.customers.set(data),
      error: error => console.error('Error loading customers:', error)
    });
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer).pipe(
      tap(() => this.loadCustomers())
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer).pipe(
      tap(() => this.loadCustomers())
    );
  }

  deleteCustomer(id: number | string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.loadCustomers(),
      error: (error) => console.error('Error deleting customer:', error)
    });
  }

  getCustomer(id: number | string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }
}
