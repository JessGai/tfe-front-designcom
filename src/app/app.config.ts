import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideFinanceComponents } from '@be-fgov-minfin/designcom-components';
import { default as packageInfo } from '../../package.json';
import { routes } from './app.routes';
import { errorInterceptorFn } from './Config/error.intercepto';

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
        redirect_uri: 'http://localhost:4200/parentinscription',
        audience: 'https://api.kidscamp.com',
        scope: 'openid profile email',
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,

      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8081/api/parent/me',

            tokenOptions: {
              authorizationParams: {
                audience: 'https://api.kidscamp.com',
              },
            },
          },
          {
            uri: 'http://localhost:8081/api/paiement/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'https://api.kidscamp.com',
              },
            },
          },
          {
            uri: 'http://localhost:8081/api/historique/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'https://api.kidscamp.com',
              },
            },
          },
        ],
      },
    }),
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn, errorInterceptorFn])
    ),
  ],
};
