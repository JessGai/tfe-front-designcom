export interface Enfant {
  idEnfant: number;
  parentId: number;
  nomEnfant: string;
  prenomEnfant: string;
  dateNaissance: string;
  commentaire: string;
}

export interface ParentWithChildren {
  idParent: number;
  email: string;
  nomParent: string;
  prenomParent: string;
  adresse: string;
  codePostal: number;
  commune: string;
  telephone1: string;
  telephone2: string;
  auth0UserId: string;
  enfants: Enfant[];
}

export interface Parent {
  idParent: number;
  email: string;
  nomParent: string;
  prenomParent: string;
  adresse: string;
  codePostal: number;
  commune: string;
  telephone1: string;
  telephone2: string;
  auth0UserId: string;
}
