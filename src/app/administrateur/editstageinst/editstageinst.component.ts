import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  selector: 'app-editstageinst',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FdcLabelModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    CommonModule,
  ],
  templateUrl: './editstageinst.component.html',
  styleUrl: './editstageinst.component.scss',
})
export class EditstageinstComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private stageService = inject(StageService);
  private router = inject(Router);

  //spinner
  isLoading = true;

  // Données liées à la description du stage
  idStageDesc!: number;
  idStageInst!: number;
  stageDescription!: StageDesc;

  //Formulaire
  stageInstanceForm: FormGroup = this.formBuilder.group({
    prix: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    dateDebut: ['', Validators.required],
    nbrParticipant: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    nbrInscrit: [{ value: '0', disabled: true }],
    statut: ['true', Validators.required],
    idStageDesc: ['', Validators.required],
  });

  //toggleButton
  protected readonly buttons = [
    { value: 'true', label: 'Actif', color: 'tertiary' },
    { value: 'false', label: 'Inactif', color: 'error' },
  ];

  //initialisation des données
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idDesc = params.get('idStageDesc');
      const idInst = params.get('idStageInst');
      if (idDesc && !isNaN(+idDesc) && idInst && !isNaN(+idInst)) {
        this.idStageDesc = +idDesc;
        this.idStageInst = +idInst;

        this.fetchStageDescription();
        this.fetchStageInstance();
      } else {
        console.error('ID(s) invalide(s) ou non défini(s) dans l’URL.');
        alert('Impossible de charger les données, identifiants invalides.');
      }
    });
  }

  //Récup des descriptions
  fetchStageDescription(): void {
    this.isLoading = true;
    this.stageService.getStageById(this.idStageDesc).subscribe({
      next: (stage) => {
        this.stageDescription = stage;
        this.stageInstanceForm.patchValue({ idStageDesc: stage.idStageDesc });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la description:', err);
        this.isLoading = false;
      },
    });
  }

  //REcup stageInst:
  fetchStageInstance(): void {
    this.stageService.getStageInstanceById(this.idStageInst).subscribe({
      next: (instance) => {
        this.stageInstanceForm.patchValue(instance);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l’instance :', err);
        alert('Erreur lors du chargement de l’instance.');
      },
    });
  }

  //Soumission du formulaire
  onSubmit(): void {
    if (this.stageInstanceForm.valid) {
      const formValue = this.stageInstanceForm.getRawValue(); // pour récupérer les champs disabled
      const dataToUpdate = {
        ...formValue,
        statut: formValue.statut === 'true',
      };

      console.log('Données envoyées au serveur (PUT):', dataToUpdate);

      this.stageService
        .updateStageInstance(this.idStageInst, dataToUpdate)
        .subscribe({
          next: (updated) => {
            console.log('Stage modifié avec succès:', updated);
            alert('Stage modifié correctement !');
            this.router.navigate(['/administrateur']);
          },
          error: (err) => {
            console.error('Erreur lors de la modification du stage:', err);
            alert('Erreur lors de la modification du stage.');
          },
        });
    } else {
      console.log('Formulaire invalide', this.stageInstanceForm.errors);
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }

  //Navigation vers l'accueil
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
