import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { StageForCards } from '../../models/stage_desc_model';
import { StageService } from '../../services/stage.service';

@Component({
  selector: 'app-stagedetail',
  imports: [
    MatIconModule,
    DatePipe,
    MatCardModule,
    NgIf,
    MatExpansionModule,
    MatButtonModule,
  ],
  templateUrl: './stagedetail.component.html',
  styleUrl: './stagedetail.component.scss',
})
export class StagedetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private stageService = inject(StageService);
  protected readonly themeImage = signal<string>('/assets/images/default.png');
  protected readonly stage = signal<StageForCards | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);
  protected readonly email = 'info@kidscamp.com';
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const idStageInst = Number(params.get('idStageInst'));
          console.log('ID récupéré depuis la route :', idStageInst);
          return this.stageService.getStageByIdFromList(idStageInst);
        })
      )
      .subscribe({
        next: (stage) => {
          console.log('Stage chargé :', stage);
          this.stage.set(stage);
          this.loading.set(false);
          if (stage?.theme) {
            const imagePath = this.getThemeImage(stage.theme);
            this.themeImage.set(imagePath);
            console.log('Image du thème chargée :', imagePath);
          }
        },
        error: (err) => {
          console.error('Erreur lors du chargement du stage :', err);
          this.error.set('Erreur lors du chargement du stage');
          this.loading.set(false);
        },
      });
  }

  calculateEndDate(startDate: Date | null | undefined): Date | null {
    if (!startDate) {
      return null; // Retourne null si startDate est null ou undefined
    }
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 5);
    return endDate;
  }
  //image
  private themeImageMap = new Map<string, string>([
    ['Football', '/assets/images/football.jpg'],
    ['Loisirs créatifs', '/assets/images/loisirs.png'],
    ['Danse', '/assets/images/danse.png'],
    ['Musique', '/assets/images/musique.png'],
  ]);

  getThemeImage(theme: string): string {
    return this.themeImageMap.get(theme) || '/assets/images/default.png';
  }
}
