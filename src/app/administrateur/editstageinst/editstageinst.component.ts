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

  //Soumission du formulaire
  onSubmit(): void {
    if (this.stageInstanceForm.valid) {
      const stageData = this.stageInstanceForm.value;

      const statutData = {
        ...stageData,
        statut: stageData.statut === 'actif',
      };

      console.log('Données envoyées au serveur:', stageData);

      this.stageService.createStageInstance(stageData).subscribe({
        next: (response) => {
          console.log('Stage créé avec succès:', response);
          alert('Stage créé correctement !');
          this.stageInstanceForm.reset();
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

  //Navigation vers l'accueil
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
