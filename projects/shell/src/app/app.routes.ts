import { Routes } from '@angular/router';
import { loadRemoteModule as originalLoadRemoteModule, LoadRemoteModuleOptions } from '@angular-architects/module-federation';
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

const loadRemoteModule = async (remoteName: string, exposedModule: string): Promise<any> => {
  const options: LoadRemoteModuleOptions = {
    type: 'module',
    remoteEntry: `http://localhost:${remoteName === 'customersMfe' ? '4201' : '4202'}/remoteEntry.js`,
    exposedModule: `./${exposedModule}`
  };

  try {
    return await originalLoadRemoteModule(options);
  } catch (err: unknown) {
    console.error('Error loading remote module:', err);
    return createErrorModule();
  }
};

export const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => loadRemoteModule('customersMfe', 'app.routes')
      .then((m: { routes: Routes }) => m.routes)
  },
  { 
    path: '', 
    redirectTo: 'customers', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    loadComponent: () => import('./fallback/fallback.component')
      .then(m => m.FallbackComponent) 
  }
];
