import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';

// Export the routes for Module Federation
export { routes as appRoutes } from './app/app.routes';

// Bootstrap the application
const bootstrap = () => bootstrapApplication(App, {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding()
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
});

if (!(window as any)['webpackChunkCustomersMfe']) {
  bootstrap().catch(err => console.error(err));
}

export { App, bootstrap };
