import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    RouterModule,
    MatSelectModule,
  ],
  templateUrl: './createstagedesc.component.html',
  styleUrl: './createstagedesc.component.scss',
})
export class CreatestagedescComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly stageService = inject(StageService);
  private readonly router = inject(Router);

  stageForm: FormGroup = this.formBuilder.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    theme: ['', Validators.required],
    ageMin: [null, [Validators.required, Validators.min(3)]],
    ageMax: [null, [Validators.required, Validators.min(4)]],
  });

  /**
   * Soumet les données du formulaire
   */
  onSubmit(): void {
    if (this.stageForm.valid) {
      const stageData = this.stageForm.value;
      console.log('Données envoyées au serveur:', stageData);
      this.stageService.createStageDescription(this.stageForm.value).subscribe({
        next: (response) => {
          console.log('Stage créé avec succès:', response);
          alert('Stage créé correctement !');
          this.stageForm.reset();
          this.navigateToAdmin();
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

  readonly themes = [
    { label: 'Football', value: 'Football' },
    { label: 'Danse', value: 'Dance' },
    { label: 'Loisirs Créatifs', value: 'Loisirs Créatifs' },
    { label: 'Musique', value: 'Musique' },
    { label: 'Sciences', value: 'Sciences' },
    { label: 'Musique', value: 'Musique' },
    { label: 'Multi-sport', value: 'Multi-sport' },
  ];
}
