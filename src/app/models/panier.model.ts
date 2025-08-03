export interface AjoutTablePanier {
  idParent: number;
  idEnfant: number;
  idStageInstance: number;
}

export interface AffichagePanier {
  montantTotal: number;
  tauxReduction: number;
  montantAvecReduction: number;
  liste: PanierDetail[];
}

export interface PanierDetail {
  stageDescTitre: string;
  stageDescTheme: string;
  stageInstDateDebut: string;
  stageInstDateFin: string;
  stageInstPrix: number;
  enfantPrenom: string;
  enfantNom: string;
}
