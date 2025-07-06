import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  //récupération de la description de stage
  //stockage de l'id et de l'objet stagedesc
  idStageDesc!: number;
  stageDescription!: StageDesc;

  protected readonly errorMessageDate = 'La date est obligatoire';

  stageInstanceForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private stageService: StageService,
    private router: Router
  ) {
    this.stageInstanceForm = this.formBuilder.group({
      prix: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateDebut: ['', Validators.required],
      nbrParticipant: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      nbrInscrit: [{ value: '0', disabled: true }],
      statut: ['true', Validators.required],
      idStageDesc: ['', Validators.required],
    });
  }

  //récupération des données de la description
  ngOnInit(): void {
    // Récupère l'ID de la description depuis l'URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('idStageDesc'); // Vérifie que le paramètre existe
      if (id && !isNaN(+id)) {
        this.idStageDesc = +id; // Convertir en nombre
        this.fetchStageDescription(); // Charger les données associées à cet ID
      } else {
        console.error("ID invalide ou non défini dans l'URL.");
        alert('ID de la description stage invalide.');
      }
    });
  }

  fetchStageDescription(): void {
    this.stageService.getStageById(this.idStageDesc).subscribe({
      next: (stage) => {
        this.stageDescription = stage; // Stocke la description
        // Préremplir un champ du formulaire si nécessaire
        this.stageInstanceForm.patchValue({ idStageDesc: stage.idStageDesc });
      },
      error: (err) =>
        console.error('Erreur lors de la récupération de la description:', err),
    });
  }

  //soumission du formulaire:
  onSubmit(): void {
    if (this.stageInstanceForm.valid) {
      const stageData = this.stageInstanceForm.value;

      //gestion actif/inactif
      const statutData = {
        ...stageData,
        statut: stageData.statut === 'actif',
      };

      console.log('Données envoyées au serveur:', stageData); // Affiche les données envoyées

      this.stageService
        .createStageInstance(this.stageInstanceForm.value)
        .subscribe({
          next: (response) => {
            console.log('Stage créé avec succès:', response);
            alert('Stage créé correctement !');
            this.stageInstanceForm.reset(); // Réinitialise le formulaire après succès
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
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  //togglebutton
  protected readonly buttons = [
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
}
