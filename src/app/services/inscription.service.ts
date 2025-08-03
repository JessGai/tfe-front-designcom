import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  /*
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  private readonly API_BASE_URL = 'http://localhost:8081/api/inscription';

  /**
   * Inscrit un enfant à une instance de stage.
   * @param inscriptionData - objet inscription
   */
  /*
  inscrire(inscriptionData: Inscriptiontobasket): Observable<void> {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.post<void>(this.API_BASE_URL, inscriptionData, {
          headers,
        });
      })
    );
  }
  */
}
