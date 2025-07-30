export interface Transaction {
  idTransaction: number;
  montant: number;
  dateTransaction: Date;
  statut: 'EN_ATTENTE' | 'PAYE';
  stripeSessionId?: string;
  emailPayeur: string;
  idParent: number;
  montantFinal: number;
  tauxReduction: number;
  dateCreation: Date;
  lastUpdate: Date;
}
