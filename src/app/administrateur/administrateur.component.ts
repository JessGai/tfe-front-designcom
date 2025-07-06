import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { StageDescriptionWithInstances } from '../models/stage_desc_model';
import { StageService } from '../services/stage.service';

@Component({
  selector: 'app-administrateur',
  imports: [
    CommonModule,
    ReactiveFormsModule, // Utilisation des Reactive Forms de préférence
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterModule,
    DatePipe,
  ],
  templateUrl: './administrateur.component.html',
  styleUrl: './administrateur.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdministrateurComponent {
  // Signals pour les données
  dataSource = signal<StageDescriptionWithInstances[]>([]);
  themes = signal<string[]>([]);
  ageMinValues = signal<number[]>([]);

  // Signals pour les filtres utilisateur
  selectedTheme = signal<string | null>(null);
  selectedMinAge = signal<number | null>(null);

  // Columns pour le tableau
  displayedColumns: string[] = [
    'idStageDesc',
    'titre',
    'theme',
    'description',
    'ageMin',
    'ageMax',
    'expand',
  ];
  displayedInstanceColumns = [
    'dateDebut',
    'prix',
    'statut',
    'nbrParticipant',
    'nbrInscrit',
    'actions',
  ];

  // État étendu
  expandedElement = signal<StageDescriptionWithInstances | null>(null);

  // Computed property pour les données filtrées
  filteredDataSource = computed(() => {
    const theme = this.selectedTheme();
    const ageGroup = this.selectedAgeGroup();

    // Filtrer les lignes principales selon les critères
    const filteredRows = this.dataSource().filter((row) => {
      const matchesTheme = theme ? row.theme === theme : true;
      const matchesAgeGroup = ageGroup ? row.ageMin >= ageGroup : true;
      return matchesTheme && matchesAgeGroup;
    });

    // Inclure les lignes d'expansion
    const expandableRows: Array<
      | StageDescriptionWithInstances
      | { detailRow: true; element: StageDescriptionWithInstances }
    > = [];

    filteredRows.forEach((mainRow) => {
      expandableRows.push(mainRow); // Ligne principale
      expandableRows.push({ detailRow: true, element: mainRow }); // Ligne d'expansion
    });

    return expandableRows;
  });

  constructor(private stageService: StageService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.stageService.getStageDescriptionsWithInstances().subscribe({
      next: (data) => {
        this.dataSource.set(data); // Signal dataSource
        this.themes.set([...new Set(data.map((stage) => stage.theme))]); // Signal themes
        this.ageMinValues.set(
          [...new Set(data.map((stage) => stage.ageMin))].sort((a, b) => a - b)
        ); // Signal ageMinValues
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
      },
    });
  }

  toggleRow(element: StageDescriptionWithInstances): void {
    this.expandedElement.set(
      this.expandedElement() === element ? null : element
    );
  }

  isDataRow = (index: number, element: any): boolean => {
    // Une ligne normale est simplement un objet principal sans propriété "detailRow"
    return !element.detailRow;
  };

  isExpansionDetailRow = (index: number, element: any): boolean => {
    // Une ligne d'expansion est identifiée par la propriété `detailRow: true`
    return !!element.detailRow;
  };

  readonly selectedAgeGroup: WritableSignal<number | null> = signal(null);
  // Calcul des groupes d'âge uniques (basé sur ageMin)
  readonly ageGroups = computed(() => [
    ...new Set(this.dataSource().map((stage) => stage.ageMin)),
  ]);
  getAgeMax(ageMin: number): number {
    const stage = this.dataSource().find((s) => s.ageMin === ageMin);
    return stage ? stage.ageMax : 0;
  }
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  navigateToAdmin(): void {
    this.router.navigate(['/administrateur']);
  }
  logElementId(instance: any): void {
    console.log('Instance imbriquée :', instance);
    console.log("ID du stage pour création d'instance:", instance.idStageDesc);
    console.log('idStageDesc :', instance.element?.idStageDesc);
  }
}
