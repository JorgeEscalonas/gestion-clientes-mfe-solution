import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CustomerFormComponent } from './customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let customerService: jasmine.SpyObj<CustomerService>;
  let router: jasmine.SpyObj<Router>;

  const mockCustomer = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890'
  };

  beforeEach(async () => {
    const customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getCustomer', 'addCustomer', 'updateCustomer']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Create a mock for paramMap
    const paramMapSpy = jasmine.createSpyObj('ParamMap', ['get']);
    paramMapSpy.get.and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(paramMapSpy),
            snapshot: {
              paramMap: paramMapSpy
            }
          }
        }
      ]
    })
    .compileComponents();

    customerService = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    customerService.getCustomer.and.returnValue(of(mockCustomer));
    customerService.addCustomer.and.returnValue(of({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890'
    }));
    customerService.updateCustomer.and.returnValue(of({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890'
    }));

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should mark all fields as required', () => {
      const form = component.form;
      const nameControl = form.get('name');
      const emailControl = form.get('email');
      const phoneControl = form.get('phone');

      nameControl?.setValue('');
      emailControl?.setValue('');
      phoneControl?.setValue('');

      expect(nameControl?.valid).toBeFalsy();
      expect(emailControl?.valid).toBeFalsy();
      expect(phoneControl?.valid).toBeFalsy();
      expect(form.valid).toBeFalsy();
    });

    it('should validate email format', () => {
      const emailControl = component.form.get('email');

      emailControl?.setValue('invalid-email');
      expect(emailControl?.valid).toBeFalsy();

      emailControl?.setValue('valid@example.com');
      expect(emailControl?.valid).toBeTruthy();
    });

    it('should validate phone number format', () => {
      const phoneControl = component.form.get('phone');

      phoneControl?.setValue('abc123');
      expect(phoneControl?.valid).toBeFalsy();

      phoneControl?.setValue('1234567890');
      expect(phoneControl?.valid).toBeTruthy();
    });
  });

  describe('Edit Mode', () => {
    let paramMapSpy: jasmine.SpyObj<any>;

    beforeEach(() => {
      const route = TestBed.inject(ActivatedRoute);

      paramMapSpy = (route.snapshot.paramMap as jasmine.SpyObj<any>);

      paramMapSpy.get.and.returnValue('1');

      fixture = TestBed.createComponent(CustomerFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load customer data in edit mode', fakeAsync(() => {
      tick(); // Wait for async operations
      expect(component.isEditMode).toBeTrue();
      expect(component.form.get('name')?.value).toBe(mockCustomer.name);
      expect(customerService.getCustomer).toHaveBeenCalledWith(1);
    }));

    it('should call updateCustomer when form is submitted in edit mode', () => {
      component.form.setValue({
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '9876543210'
      });

      component.onSubmit();

      expect(customerService.updateCustomer).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '9876543210'
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle error when loading customer fails', fakeAsync(() => {
      const error = new Error('Failed to load customer');
      customerService.getCustomer.and.returnValue(throwError(() => error));

      const route = TestBed.inject(ActivatedRoute);
      const paramMapSpy = (route.snapshot.paramMap as jasmine.SpyObj<any>);
      paramMapSpy.get.and.returnValue('999');

      spyOn(console, 'error');

      fixture = TestBed.createComponent(CustomerFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tick();

      expect(console.error).toHaveBeenCalledWith(
        'Error al cargar el cliente:',
        jasmine.objectContaining({
          error: error
        })
      );
    }));

    it('should handle error when saving customer fails', () => {
      const error = new Error('Failed to save customer');
      customerService.addCustomer.and.returnValue(throwError(() => error));

      spyOn(console, 'error');

      component.form.setValue({
        name: 'New Customer',
        email: 'new@example.com',
        phone: '1234567890'
      });

      component.onSubmit();

      expect(console.error).toHaveBeenCalledWith('Error al guardar el cliente:', error);
    });
  });
});
