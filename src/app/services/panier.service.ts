import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { AjoutTablePanier } from '../models/panier.model';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  private readonly API_BASE_URL = 'http://localhost:8081/api/panier';

  addALineInPanier(data: AjoutTablePanier): Observable<AjoutTablePanier> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AjoutTablePanier>(`${this.API_BASE_URL}`, data, {
      headers,
    });
  }
}
