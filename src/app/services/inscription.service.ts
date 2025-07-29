import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  private readonly API_BASE_URL = 'http://localhost:8081/api/inscription';

  /**
   * Inscrit un enfant à une instance de stage.
   * @param idEnfant - ID de l’enfant à inscrire
   * @param idStageInst - ID de l’instance du stage
   */
  inscrire(idEnfant: number, idStageInst: number): Observable<void> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.post<void>(
          `${this.API_BASE_URL}/${idEnfant}/${idStageInst}`,
          null,
          { headers }
        );
      })
    );
  }
}
