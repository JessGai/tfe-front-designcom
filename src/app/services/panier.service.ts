import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { AffichagePanier, AjoutTablePanier } from '../models/panier.model';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  private readonly API_BASE_URL = 'http://localhost:8081/api/panier';
  /**
   * Permet d'ajouter une ligne dans la table Panier pour la gestion des inscriptions et du panier
   */
  addALineInPanier(data: AjoutTablePanier): Observable<AjoutTablePanier> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AjoutTablePanier>(`${this.API_BASE_URL}`, data, {
      headers,
    });
  }
  /**
   * Récupère les inscriptions du parent qui ne sont pas payé (de la table Panier)
   * @param id Identifiant du parent connecté
   * @returns Observable<AffichagePanier>
   */
  getPanier(idParent: number): Observable<AffichagePanier> {
    const url = `${this.API_BASE_URL}/${idParent}`;
    return this.http.get<AffichagePanier>(url);
  }

  startPayment(
    montant: number,
    idParent: number
  ): Observable<{ checkoutUrl: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { montant, idParent };

    return this.http.post<{ checkoutUrl: string }>(
      'http://localhost:8081/api/paiement/create-checkout-session',
      body,
      { headers }
    );
  }

  confirmerPaiement(
    sessionId: string,
    idParent: number,
    montant: number
  ): Observable<string> {
    return this.http.post(
      `http://localhost:8081/api/paiement/confirm?sessionId=${sessionId}&idParent=${idParent}&montant=${montant}`,
      {},
      { responseType: 'text' }
    );
  }
}
