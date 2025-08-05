import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { StageForCards } from '../models/stage_desc_model';
import { StageService } from '../services/stage.service';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss',
})
export class SandboxComponent {
  private readonly router = inject(Router);
  private readonly stageService = inject(StageService);
  auth = inject(AuthService);

  // Liste des stages
  protected readonly stages = toSignal(
    this.stageService.getAllStageForCards(),
    { initialValue: [] }
  );

  // Tranches d'âge uniques
  protected readonly ageRanges = computed(() => {
    const ageSet = new Set<string>();
    this.stages().forEach((stage) => {
      const range = `${stage.ageMin} - ${stage.ageMax} ans`;
      ageSet.add(range);
    });
    return ageSet;
  });
  // Thèmes uniques
  protected readonly themes = computed(
    () => new Set(this.stages().map((stage) => stage.theme))
  );
  // Périodes uniques
  protected readonly periods = computed(() => {
    const periodSet = new Set<string>();
    this.stages().forEach((stage) => {
      const period = `${stage.dateDebut.toLocaleDateString()} au ${stage.endDate?.toLocaleDateString()}`;
      periodSet.add(period);
    });
    return periodSet;
  });

  // Formulaire de filtre des stages
  protected readonly stageForm = new FormGroup({
    ageRange: new FormControl<string | null>(null),
    theme: new FormControl<string | null>(null),
    period: new FormControl<string | null>(null),
  });
  private readonly stageFormChange = toSignal(this.stageForm.valueChanges);

  // Stages filtrés
  protected readonly filteredStages = computed(() => {
    const stages = this.stages();
    const stageFormValue = this.stageFormChange();

    // Filtrage par âge
    let filtered = stages;

    if (stageFormValue?.ageRange) {
      const [minAge, maxAge] = stageFormValue.ageRange
        .split(' - ')
        .map((age) => Number(age.replace(' ans', '').trim()));
      filtered = filtered.filter(
        (stage) => stage.ageMin >= minAge && stage.ageMax <= maxAge
      );
    }

    // Filtrage par thème
    if (stageFormValue?.theme) {
      filtered = filtered.filter(
        (stage) => stage.theme === stageFormValue.theme
      );
    }

    if (stageFormValue?.period) {
      const [startStr, endStr] = stageFormValue.period.split(' au ');
      const startDate = new Date(startStr.split('/').reverse().join('-'));
      const endDate = new Date(endStr.split('/').reverse().join('-'));

      filtered = filtered.filter((stage) => {
        const stageStartDate = new Date(stage.dateDebut);
        return stageStartDate >= startDate && stageStartDate <= endDate;
      });
    }

    return filtered;
  });

  protected trackById(index: number, stage: StageForCards): number {
    return stage.idStageDesc;
  }

  protected navigateToStageDetail(idStageInst: number): void {
    console.log('Navigation vers le stage ID :', idStageInst); // Ajoutez un log pour vérifier l'ID
    this.router.navigate(['/stagedetail', idStageInst]);
  }
}
