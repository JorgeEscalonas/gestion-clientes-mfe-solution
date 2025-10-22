import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="customers-container">
      <h2>Customers List</h2>
      <p>This is the customers microfrontend content.</p>
      <ul>
        <li *ngFor="let customer of customers()">{{ customer }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .customers-container {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 0.5rem;
      margin: 0.25rem 0;
      background-color: white;
      border: 1px solid #eee;
      border-radius: 3px;
    }
  `]
})
export class CustomersComponent {
  protected readonly customers = signal([
    'Customer 1',
    'Customer 2',
    'Customer 3',
    'Customer 4',
    'Customer 5'
  ]);
}
