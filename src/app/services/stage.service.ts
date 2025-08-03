import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  PaginatedStageDescResponse,
  StageDesc,
  StageDescriptionWithInstances,
  StageForCards,
  StageInst,
} from '../models/stage_desc_model';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  readonly API_BASE_URL = 'http://localhost:8081/api/stagedesc';
  readonly API_BASE_URL_INSTANCE = 'http://localhost:8081/api/stageinst';
  readonly http = inject(HttpClient);
  //image
  private themeImageMap = new Map<string, string>([
    ['Football', '/assets/images/football.jpg'],
    ['Loisirs créatifs', '/assets/images/loisirs.png'],
    ['Danse', '/assets/images/danse.png'],
    ['Musique', '/assets/images/musique.png'],
  ]);

  /**
   * Récupère une liste paginée de StageDesc
   * @param page numéro de la page (défaut : 0)
   * @param size taille des résultats (défaut : 20)
   * @returns Observable<PaginatedStageDescResponse>
   */
  getAllStages(page = 0, size = 20): Observable<PaginatedStageDescResponse> {
    // Construire dynamiquement l'URL
    const url = `${this.API_BASE_URL}?page=${page}&size=${size}`;

    return this.http.get<PaginatedStageDescResponse>(url).pipe(
      map((response) => ({
        ...response,
        content: response.content.map((item) => ({
          ...item,
          dateCreation: new Date(item.dUpdate),
        })),
      })),
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('Erreur dans StageService:', error);
    return throwError(() => error);
  }
  /**
   * Récupère un StageDesc spécifique par son ID
   * @param id Identifiant du StageDesc
   * @returns Observable<StageDesc>
   */
  getStageById(id: number): Observable<StageDesc> {
    const url = `${this.API_BASE_URL}/${id}`; // Interpolation dynamique pour l'ID
    return this.http.get<StageDesc>(url).pipe(
      map((item) => ({
        ...item,
        dateCreation: new Date(item.dUpdate), // Convertir la chaîne ISO en Date
      }))
    );
  }
  getStageDescriptionsWithInstances(): Observable<
    StageDescriptionWithInstances[]
  > {
    return this.http.get<StageDescriptionWithInstances[]>(
      `${this.API_BASE_URL}/with-instances`
    );
  }

  /**
   * Envoie une requête POST pour créer une nouvelle description de stage.
   * @param stageData - Les données de la nouvelle description à créer.
   */
  createStageDescription(stageData: StageDesc): Observable<StageDesc> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<StageDesc>(`${this.API_BASE_URL}`, stageData, {
      headers,
    });
  }
  createStageInstance(stageData: StageInst): Observable<StageInst> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<StageInst>(
      `${this.API_BASE_URL_INSTANCE}`,
      stageData,
      { headers }
    );
  }
  getAllStageForCards(): Observable<StageForCards[]> {
    return this.http
      .get<StageForCards[]>(`${this.API_BASE_URL_INSTANCE}/cards`)
      .pipe(
        map((stages) =>
          stages.map((stage) => {
            const dateDebut = new Date(stage.dateDebut);
            return {
              ...stage,
              imagePath: this.getThemeImage(stage.theme),
              dateDebut,
              endDate: this.calculateEndDate(dateDebut),
            };
          })
        )
      );
  }
  //methode de getbyId pour les cards
  getStageByIdFromList(idStageInst: number): Observable<StageForCards> {
    return this.getAllStageForCards().pipe(
      map((stages) => stages.find((s) => s.idStageInst === idStageInst)),
      map((stage) => {
        if (!stage) throw new Error('Stage non trouvé');
        return stage;
      })
    );
  }

  private calculateEndDate(startDate: Date): Date {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 5); // Ajoute 5 jours
    return endDate;
  }

  private getThemeImage(theme: string): string {
    return this.themeImageMap.get(theme) || '/assets/images/default.png';
  }
}
