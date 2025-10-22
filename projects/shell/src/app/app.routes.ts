import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { FallbackComponent } from './fallback/fallback.component';

// Crear un módulo de respaldo para manejar errores
const createErrorModule = () => {
  return {
    ngModule: class {
      static ɵmod = {
        ɵmod: {
          ɵproviders: [],
          ɵdeclarations: [FallbackComponent],
          ɵimports: [],
          ɵexports: [FallbackComponent]
        }
      };
    }
  };
};

export const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => 
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Component'
      })
      .then(m => m.CustomersModule)
      .catch(err => {
        console.error('Error loading remote module:', err);
        return createErrorModule();
      })
  },
  { 
    path: '', 
    redirectTo: 'customers', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    loadComponent: () => import('./fallback/fallback.component').then(m => m.FallbackComponent)
  }
];
