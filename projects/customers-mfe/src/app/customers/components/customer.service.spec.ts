import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';

it('debe cargar clientes correctamente', () => {
  const mockData = [{ id: 1, name: 'Ana', email: 'a@mail.com', phone: '123' }];
  http.get.and.returnValue(of(mockData));

  service.loadCustomers();
  expect(service.customers$()).toEqual(mockData);
});
