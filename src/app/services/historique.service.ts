import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { historique } from '../models/historique.model';

@Injectable({
  providedIn: 'root',
})
export class HistoriqueService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  private readonly API_BASE_URL = 'http://localhost:8081/api/historique';

  getHistorique(idParent: number): Observable<historique[]> {
    const url = `${this.API_BASE_URL}/${idParent}`;
    return this.http.get<historique[]>(url);
  }
}
