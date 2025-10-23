import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer.model';
import { signal } from '@angular/core';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  const mockCustomers: Customer[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load customers on init', () => {
    const req = httpMock.expectOne('http://localhost:3000/customers');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
    
    const customers = service.customers$();
    expect(customers.length).toBe(2);
    expect(customers).toEqual(mockCustomers);
  });

  it('should add a new customer', () => {
    const newCustomer: Customer = { 
      id: 3, 
      name: 'New User', 
      email: 'new@example.com', 
      phone: '5555555555' 
    };

    service.addCustomer(newCustomer).subscribe(customer => {
      expect(customer).toEqual(newCustomer);
    });

    const req = httpMock.expectOne('http://localhost:3000/customers');
    expect(req.request.method).toBe('POST');
    req.flush(newCustomer);

    // Verify that loadCustomers was called
    const loadReq = httpMock.expectOne('http://localhost:3000/customers');
    loadReq.flush([...mockCustomers, newCustomer]);
  });

  it('should update a customer', () => {
    const updatedCustomer = { ...mockCustomers[0], name: 'Updated Name' };

    service.updateCustomer(updatedCustomer).subscribe(customer => {
      expect(customer).toEqual(updatedCustomer);
    });

    const req = httpMock.expectOne(`http://localhost:3000/customers/${updatedCustomer.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCustomer);

    // Verify that loadCustomers was called
    const loadReq = httpMock.expectOne('http://localhost:3000/customers');
    loadReq.flush(mockCustomers);
  });

  it('should delete a customer', () => {
    const customerId = 1;
    
    service.deleteCustomer(customerId);
    
    const req = httpMock.expectOne(`http://localhost:3000/customers/${customerId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    // Verify that loadCustomers was called
    const loadReq = httpMock.expectOne('http://localhost:3000/customers');
    loadReq.flush(mockCustomers.filter(c => c.id !== customerId));
  });

  it('should handle errors when loading customers', () => {
    const consoleSpy = spyOn(console, 'error');
    
    service.loadCustomers();
    
    const req = httpMock.expectOne('http://localhost:3000/customers');
    req.flush('Error loading customers', { 
      status: 500, 
      statusText: 'Server Error' 
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Error loading customers:', jasmine.any(Object));
  });

  it('should get a single customer', () => {
    const customerId = 1;
    const expectedCustomer = mockCustomers[0];

    service.getCustomer(customerId).subscribe(customer => {
      expect(customer).toEqual(expectedCustomer);
    });

    const req = httpMock.expectOne(`http://localhost:3000/customers/${customerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedCustomer);
  });
});
