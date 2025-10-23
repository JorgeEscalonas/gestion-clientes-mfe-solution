import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer.model';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/customers';
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

  it('should load customers on initialization', () => {
  
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);

    expect(service.customers$()).toEqual(mockCustomers);
  });
});
