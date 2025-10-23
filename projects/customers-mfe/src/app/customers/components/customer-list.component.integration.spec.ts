import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../services/customer.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerFormComponent } from './customer-form.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { signal } from '@angular/core';

const mockCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' }
];

describe('CustomerListComponent Integration', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerService: jasmine.SpyObj<CustomerService>;
  let router: Router;
  let location: Location;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const customerServiceSpy = jasmine.createSpyObj('CustomerService',
      ['loadCustomers', 'deleteCustomer', 'getCustomers']);

    // Create a writable signal for testing
    const customersSignal = signal<Customer[]>(mockCustomers);

    // Mock the customers$ computed signal
    customerServiceSpy.customers$ = jasmine.createSpy().and.callFake(() => customersSignal());

    // Mock the getCustomers method
    customerServiceSpy.getCustomers = jasmine.createSpy().and.returnValue(of(mockCustomers));
    customerServiceSpy.loadCustomers = jasmine.createSpy().and.returnValue(of(mockCustomers));
    customerServiceSpy.deleteCustomer = jasmine.createSpy().and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'customers', component: CustomerListComponent },
          { path: 'customers/new', component: CustomerFormComponent },
          { path: 'customers/:id', component: CustomerFormComponent }
        ])
      ],
      declarations: [CustomerListComponent],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    customerService = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of customers', () => {
    fixture.detectChanges();
    const customerRows = debugElement.queryAll(By.css('tr[data-testid="customer-row"]'));
    expect(customerRows.length).toBe(mockCustomers.length);
    const firstRow = customerRows[0].nativeElement;
    expect(firstRow.textContent).toContain('John Doe');
    expect(firstRow.textContent).toContain('john@example.com');
  });

  it('should navigate to add customer when add button is clicked', fakeAsync(() => {
    const addButton = debugElement.query(By.css('button[data-testid="add-customer"]'));
    addButton.triggerEventHandler('click', null);
    tick();
    expect(location.path()).toBe('/customers/new');
  }));

  it('should navigate to edit customer when edit button is clicked', fakeAsync(() => {
    const editButton = debugElement.query(By.css('button[data-testid="edit-1"]'));
    editButton.triggerEventHandler('click', null);
    tick();
    expect(location.path()).toBe('/customers/1');
  }));

  it('should call deleteCustomer when delete button is clicked', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteButton = debugElement.query(By.css('button[data-testid="delete-1"]'));
    deleteButton.triggerEventHandler('click', null);
    expect(customerService.deleteCustomer).toHaveBeenCalledWith(1);
  });

  it('should handle errors when loading customers fails', fakeAsync(() => {
    const error = new Error('Failed to load customers');
    // Override the getCustomers to return an error
    customerService.getCustomers.and.returnValue(throwError(() => error));

    // Spy on console.error before creating a new component instance
    const consoleSpy = spyOn(console, 'error');

    // Create a new component instance to trigger ngOnInit
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    tick(); // Wait for async operations to complete

    expect(consoleSpy).toHaveBeenCalledWith('Error loading customers', error);
  }));
});
