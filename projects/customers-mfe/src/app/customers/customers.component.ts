import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="customers-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .customers-container {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class CustomersComponent {}
