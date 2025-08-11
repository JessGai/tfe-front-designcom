import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FdcLabelModule } from '@be-fgov-minfin/designcom-components';
import { StageDesc } from '../../models/stage_desc_model';
import { StageService } from '../../services/stage.service';

@Component({
  selector: 'app-createstageinst',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FdcLabelModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatButtonToggleModule,
    CommonModule,
  ],
  templateUrl: './createstageinst.component.html',
  styleUrl: './createstageinst.component.scss',
})
export class CreatestageinstComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly stageService = inject(StageService);
  private readonly router = inject(Router);

  readonly errorMessageDate = 'La date est obligatoire';

  readonly stageInstanceForm: FormGroup = this.formBuilder.group({
    prix: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    nbrParticipant: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    nbrInscrit: [{ value: '0', disabled: true }],
    statut: ['true', Validators.required],
    idStageDesc: [{ value: '0', disabled: true }, Validators.required],
  });

  idStageDesc!: number;
  stageDescription!: StageDesc;

  readonly buttons = [
    {
      value: 'true',
      label: 'Actif',
      color: 'tertiary',
    },
    {
      value: 'false',
      label: 'Inactif',
      color: 'error',
    },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('idStageDesc');
      if (id && !isNaN(+id)) {
        this.idStageDesc = +id;
        this.fetchStageDescription();
      } else {
        console.error("ID invalide ou non défini dans l'URL.");
        alert('ID de la description stage invalide.');
      }
    });
  }

  fetchStageDescription(): void {
    this.stageService.getStageById(this.idStageDesc).subscribe({
      next: (stage) => {
        this.stageDescription = stage;
        this.stageInstanceForm.patchValue({ idStageDesc: stage.idStageDesc });
      },
      error: (err) =>
        console.error('Erreur lors de la récupération de la description:', err),
    });
  }

  onSubmit(): void {
    if (this.stageInstanceForm.valid) {
      const formValue = this.stageInstanceForm.getRawValue(); // pour inclure `nbrInscrit`
      const transformed = {
        ...formValue,
        statut: formValue.statut === 'true',
      };

      console.log('Données envoyées au serveur:', transformed);

      this.stageService.createStageInstance(transformed).subscribe({
        next: (response) => {
          console.log('Stage instance créée avec succès:', response);
          alert('Stage créé correctement !');
          this.stageInstanceForm.reset();
          this.navigateToAdmin();
        },
        error: (err) => {
          console.error('Erreur lors de la création du stage:', err);
          alert('Erreur lors de la création du stage.');
        },
      });
    } else {
      console.log('Formulaire invalide', this.stageInstanceForm.errors);
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }

  navigateToAdmin(): void {
    this.router.navigate(['/administrateur']);
  }
}
