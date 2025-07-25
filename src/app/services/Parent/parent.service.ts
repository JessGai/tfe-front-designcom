import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';
import { Parent, ParentWithChildren } from '../../models/parent_model';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  readonly http = inject(HttpClient);
  auth0 = inject(AuthService);
  readonly API_BASE_URL = 'http://localhost:8081/api/parent';
  readonly API_BASE_URL_PARENTENFANT = 'http://localhost:8081/api/parent/me';

  getParentWithChildren(): Observable<ParentWithChildren> {
    return this.http.get<ParentWithChildren>(this.API_BASE_URL_PARENTENFANT);
  }
  /**
   * Envoie une requête POST pour créer un nouveau parent.
   * @param auth0UserId - Identifiant unique de auth0.
   */
  parentExists(auth0UserId: string): Observable<boolean> {
    return this.auth0.getAccessTokenSilently().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.http.get<boolean>(`${this.API_BASE_URL}/exists`, {
          params: { auth0UserId },
          headers,
        });
      })
    );
  }
  /**
   * Envoie une requête POST pour créer un nouveau parent.
   * @param parentData - Les données du parent à créer.
   */
  createParent(parentData: Parent): Observable<Parent> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    return this.http.post<Parent>(
      `${this.API_BASE_URL_PARENTENFANT}`,
      parentData,
      { headers }
    );
  }
}
