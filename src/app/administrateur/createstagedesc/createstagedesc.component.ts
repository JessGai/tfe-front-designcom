import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FdcLabelModule } from '@be-fgov-minfin/designcom-components';
import { StageService } from '../../services/stage.service';

@Component({
  selector: 'app-createstagedesc',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FdcLabelModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
  ],
  templateUrl: './createstagedesc.component.html',
  styleUrl: './createstagedesc.component.scss',
})
export class CreatestagedescComponent {
  // Déclare le formulaire comme un FormGroup
  stageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stageService: StageService,
    private router: Router
  ) {
    // Initialisation du FormGroup avec des FormControls et leurs validations
    this.stageForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      theme: ['', Validators.required],
      ageMin: [null, [Validators.required, Validators.min(3)]],
      ageMax: [null, [Validators.required, Validators.min(4)]],
    });
  }

  /**
   * Soumet les données du formulaire
   */
  onSubmit(): void {
    if (this.stageForm.valid) {
      const stageData = this.stageForm.value;
      console.log('Données envoyées au serveur:', stageData); // Affiche les données envoyées
      this.stageService.createStageDescription(this.stageForm.value).subscribe({
        next: (response) => {
          console.log('Stage créé avec succès:', response);
          alert('Stage créé correctement !');
          this.stageForm.reset(); // Réinitialise le formulaire après succès
        },
        error: (err) => {
          console.error('Erreur lors de la création du stage:', err);
          alert('Erreur lors de la création du stage.');
        },
      });
    } else {
      console.log('Formulaire invalide', this.stageForm.errors);
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  navigateToAdmin(): void {
    this.router.navigate(['/administrateur']);
  }
}
