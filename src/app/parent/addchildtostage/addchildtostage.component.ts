import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FdcLabelModule } from '@be-fgov-minfin/designcom-components';
import { InscriptionDialogData } from '../../models/dialog-data.model';
import { Inscriptiontobasket } from '../../models/inscriptiontobasket.model';
import { Enfant } from '../../models/parent_model';
import { InscriptionService } from '../../services/inscription.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-addchildtostage',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatSelectModule,
    FdcLabelModule,
    NgIf,
    NgForOf,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './addchildtostage.component.html',
  styleUrl: './addchildtostage.component.scss',
})
export class AddchildtostageComponent {
  readonly dialogRef = inject(MatDialogRef<AddchildtostageComponent>);
  readonly data = inject<InscriptionDialogData>(MAT_DIALOG_DATA);
  readonly inscriptionService = inject(InscriptionService);
  readonly transactionService = inject(TransactionService);

  readonly selectedEnfant = model<Enfant | null>(null);
  readonly ageIncorrect = signal(false);

  validerInscription() {
    const enfant = this.selectedEnfant();
    if (!enfant) return;

    const age = this.calculerAge(enfant.dateNaissance);
    const { ageMin, ageMax } = this.data.stage;

    console.log('Âge de l’enfant :', age);
    console.log('Tranche requise :', ageMin, '-', ageMax);

    if (age < ageMin || age > ageMax) {
      this.ageIncorrect.set(true);
      return;
    }

    this.ageIncorrect.set(false);

    const inscriptionData: Inscriptiontobasket = {
      idEnfant: enfant.idEnfant,
      idStageInstance: this.data.stage.idStageInst,
      idTransaction: this.data.idTransaction,
    };
    console.log('Inscription envoyée :', inscriptionData);
    this.inscriptionService.inscrire(inscriptionData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erreur lors de l’inscription :', err);
      },
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  calculerAge(dateNaissance: string): number {
    const birth = new Date(dateNaissance);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
  verifierAge() {
    const enfant = this.selectedEnfant();
    if (!enfant) {
      this.ageIncorrect.set(false);
      return;
    }

    const age = this.calculerAge(enfant.dateNaissance);
    const { ageMin, ageMax } = this.data.stage;

    this.ageIncorrect.set(age < ageMin || age > ageMax);
  }
}
