import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { InscriptionDialogData } from '../../models/dialog-data.model';
import { Enfant, ParentWithChildren } from '../../models/parent_model';
import { StageForCards } from '../../models/stage_desc_model';
import { AddchildtostageComponent } from '../../parent/addchildtostage/addchildtostage.component';
import { ParentService } from '../../services/Parent/parent.service';
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
  private parentService = inject(ParentService);
  private dialog = inject(MatDialog);

  protected readonly themeImage = signal<string>('/assets/images/default.png');
  protected readonly stage = signal<StageForCards | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);
  protected readonly parent = signal<ParentWithChildren | null>(null);

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
    this.parentService.getParentWithChildren().subscribe({
      next: (parentData) => {
        this.parent.set(parentData);
      },
      error: (err) => {
        console.error('Erreur chargement parent :', err);
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

  //ouverture du pop-up pour l'inscription d'un enfant a un stage
  openInscriptionDialog(stage: StageForCards, enfants: Enfant[]) {
    const parent = this.parent();
    if (!parent) return;

    this.dialog.open(AddchildtostageComponent, {
      data: {
        stage,
        enfants,
        idParent: parent.idParent,
      } satisfies InscriptionDialogData,
      width: '800px',
    });
  }
}
