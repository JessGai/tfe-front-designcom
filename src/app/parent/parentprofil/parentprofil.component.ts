import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FdcLabelModule } from '@be-fgov-minfin/designcom-components';
import { ParentWithChildren } from '../../models/parent_model';
import { ParentService } from '../../services/Parent/parent.service';

@Component({
  selector: 'app-parentprofil',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FdcLabelModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    RouterLink,
  ],
  templateUrl: './parentprofil.component.html',
  styleUrl: './parentprofil.component.scss',
})
export class ParentprofilComponent implements OnInit {
  auth = inject(AuthService);
  parentService = inject(ParentService);

  parent: ParentWithChildren | null = null;
  errorMessage: string | null = null;
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.parentService.getParentWithChildren().subscribe({
      next: (data) => {
        this.parent = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération :', error);
        this.errorMessage = 'Impossible de récupérer les données du parent.';
        this.loading = false;
      },
    });
  }
}
