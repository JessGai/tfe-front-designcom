import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { ParentService } from '../services/Parent/parent.service';

export const redirectionGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const parentService = inject(ParentService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    switchMap((user) => {
      const auth0UserId = user?.sub;
      if (!auth0UserId) {
        return of(router.parseUrl('/welcomePage'));
      }
      return parentService.parentExists(auth0UserId).pipe(
        map((exists) => {
          if (exists) {
            return router.parseUrl('/welcomePage');
          }
          return true; // autorise accès au formulaire
        }),
        catchError(() => of(router.parseUrl('/welcomePage')))
      );
    }),
    catchError(() => of(router.parseUrl('/welcomePage')))
  );
};
