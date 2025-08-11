import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { historique } from '../../models/historique.model';
import { ParentWithChildren } from '../../models/parent_model';
import { HistoriqueService } from '../../services/historique.service';
import { ParentService } from '../../services/Parent/parent.service';

@Component({
  selector: 'app-historique',
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    CurrencyPipe,
    NgIf,
    DatePipe,
  ],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss',
})
export class HistoriqueComponent implements OnInit {
  dataSource = signal<historique[]>([]);
  historiqueService = inject(HistoriqueService);
  parentService = inject(ParentService);
  readonly parent = signal<ParentWithChildren | null>(null);

  displayedColumns: string[] = [
    'titreStage',
    'themeStage',
    'dateDebut',
    'dateFin',
    'prenomEnfant',
    'nomEnfant',
    'prixApresReduction',
    'tauxReduction',
    'datePaiement',
  ];

  ngOnInit() {
    this.parentService
      .getParentWithChildren()
      .pipe(
        switchMap((parent) => {
          this.parent.set(parent);
          return this.historiqueService.getHistorique(parent.idParent);
        })
      )
      .subscribe({
        next: (data) => this.dataSource.set(data),
        error: (err) =>
          console.error('Erreur lors du chargement des données', err),
      });
  }
}
