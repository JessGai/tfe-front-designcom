export interface StageDesc {
  idStageDesc: number;
  titre: string;
  theme: string;
  description: string;
  ageMin: number;
  ageMax: number;
  dCreation: string;
  dUpdate: string;
}

export type StagedescList = StageDesc[];

export interface PaginatedStageDescResponse {
  content: StageDesc[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
export interface StageInst {
  idStageInst: number;
  prix: number;
  dateDebut: Date;
  dateFin: Date;
  nbrParticipant: number;
  nbrInscrit: number;
  statut: boolean;
  idStageDesc: number;
  dateCreation: Date;
  dateUpdate: Date;
}
export type StageInstList = StageInst[];

export interface StageDescriptionWithInstances {
  idStageDesc: number;
  titre: string;
  theme: string;
  description: string;
  ageMin: number;
  ageMax: number;
  dUpdate: Date;
  instances: StageInst[];
}

export interface StageForCards {
  idStageDesc: number;
  titre: string;
  theme: string;
  description: string;
  ageMin: number;
  ageMax: number;
  idStageInst: number;
  prix: number;
  dateDebut: Date;
  endDate?: Date;
  nbrParticipant: number;
  nbrInscrit: number;
  statut: boolean;
  imagePath?: string;
}
