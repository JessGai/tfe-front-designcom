import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideFinanceComponents } from '@be-fgov-minfin/designcom-components';
import { default as packageInfo } from '../../package.json';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFinanceComponents(packageInfo.version),
    provideAuth0({
      domain: 'dev-ox066ujh.us.auth0.com',
      clientId: 'jZ5jpZu1dHNCghztbrzjcON016PLUKId',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://api.kidscamp.com',
        scope: 'openid profile email offline_access',
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    }),
    provideHttpClient(),
  ],
};
