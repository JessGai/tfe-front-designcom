import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let customMessage = 'Une erreur inconnue est survenue';

      if (error.error?.message) {
        customMessage = error.error.message;
      }

      console.error('Erreur API captée :', customMessage);

      return throwError(() => new Error(customMessage));
    })
  );
};
