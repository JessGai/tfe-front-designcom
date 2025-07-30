import { Component } from '@angular/core';

@Component({
  selector: 'app-panier',
  imports: [],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss',
})
export class PanierComponent {
  /** dataSource = signal<StageDesc[]>([]);
  stageService = inject(StageService);

  displayedColumns: string[] = [
    'idStageDesc',
    'titre',
    'theme',
    'description',
    'ageMin',
    'ageMax',
    'expand',
  ];

  loadData(): void {
    this.stageService.getStageById(5).subscribe({
      next: (data) => {
        this.dataSource.set(data); // Signal dataSource
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
      },
    });
  }*/
}
