import { Enfant } from './parent_model';
import { StageForCards } from './stage_desc_model';

export interface InscriptionDialogData {
  enfants: Enfant[];
  stage: StageForCards;
  idParent: number;
}
