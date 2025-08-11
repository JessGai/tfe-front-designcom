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
import { Router } from '@angular/router';
import { FdcLabelModule } from '@be-fgov-minfin/designcom-components';
import { InscriptionDialogData } from '../../models/dialog-data.model';
import { AjoutTablePanier } from '../../models/panier.model';
import { Enfant } from '../../models/parent_model';
import { PanierService } from '../../services/panier.service';

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
  readonly panierService = inject(PanierService);
  readonly router = inject(Router);

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

    const inscriptionData: AjoutTablePanier = {
      idEnfant: enfant.idEnfant,
      idStageInstance: this.data.stage.idStageInst,
      idParent: this.data.idParent,
    };
    console.log('Inscription envoyée :', inscriptionData);
    this.panierService.addALineInPanier(inscriptionData).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.router.navigate(['/panier']);
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
