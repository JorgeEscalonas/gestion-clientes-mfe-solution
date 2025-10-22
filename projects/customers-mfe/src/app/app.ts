import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <h1>{{ title() }}</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #333;
      margin-bottom: 1.5rem;
    }
  `]
})
export class App {
  protected readonly title = signal('Customers Microfrontend');
}
