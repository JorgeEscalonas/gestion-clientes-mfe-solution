import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  loading = false;
  customerId: number | null = null;
  pageTitle = 'Nuevo Cliente';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.customerId = +id;
      this.pageTitle = 'Editar Cliente';
      this.loadCustomerData(+id);
    }
  }

  private loadCustomerData(id: number): void {
    this.loading = true;
    console.log('Cargando datos del cliente con ID:', id);

    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        console.log('Respuesta del servidor:', customer);
        if (customer) {
          console.log('Datos del cliente recibidos:', customer);
          this.form.patchValue({
            name: customer.name,
            email: customer.email,
            phone: customer.phone
          });
        } else {
          console.warn('El cliente con ID', id, 'no fue encontrado');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar el cliente:', {
          error: error,
          status: error.status,
          message: error.message,
          url: error.url
        });
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const customerData = this.form.value;

    const operation = this.isEditMode && this.customerId
      ? this.customerService.updateCustomer({ ...customerData, id: this.customerId })
      : this.customerService.addCustomer(customerData);

    operation.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al guardar el cliente:', error);
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/', 'customers']);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return control ? control.hasError(errorName) && (control.dirty || control.touched) : false;
  }
}
