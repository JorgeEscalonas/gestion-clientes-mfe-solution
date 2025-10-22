import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fallback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fallback-container">
      <h2>Error al cargar el módulo</h2>
      <p>Lo sentimos, no se pudo cargar la aplicación en este momento.</p>
      <p>Por favor, intente recargar la página o contacte al soporte técnico.</p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
    .fallback-container {
      text-align: center;
      padding: 2rem;
      margin: 2rem;
      border: 1px solid #ff6b6b;
      border-radius: 8px;
      background-color: #fff5f5;
    }
    h2 {
      color: #e03131;
      margin-bottom: 1rem;
    }
    p {
      margin: 0.5rem 0;
      color: #495057;
    }
  `]
})
export class FallbackComponent { }
