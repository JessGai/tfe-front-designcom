import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AffichagePanier, PanierDetail } from '../../models/panier.model';
import { ParentWithChildren } from '../../models/parent_model';
import { PanierService } from '../../services/panier.service';
import { ParentService } from '../../services/Parent/parent.service';

@Component({
  selector: 'app-panier',
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    CurrencyPipe,
    NgIf,
    MatButtonModule,
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss',
})
export class PanierComponent {
  panier = signal<AffichagePanier | null>(null);
  dataSource = signal<PanierDetail[]>([]);
  readonly parent = signal<ParentWithChildren | null>(null);

  panierService = inject(PanierService);
  parentService = inject(ParentService);

  displayedColumns: string[] = [
    'stageDescTitre',
    'stageDescTheme',
    'stageInstDateDebut',
    'stageInstDateFin',
    'enfantPrenom',
    'enfantNom',
    'stageInstPrix',
    'actions',
  ];

  ngOnInit() {
    this.parentService.getParentWithChildren().subscribe({
      next: (parent) => {
        this.parent.set(parent);
        this.panierService.getPanier(parent.idParent).subscribe({
          next: (data) => {
            this.panier.set(data);
            this.dataSource.set(data.liste ?? []);
          },
          error: (err) => console.error('Erreur panier :', err),
        });
      },
      error: (err) => console.error('Erreur parent :', err),
    });
  }
}
