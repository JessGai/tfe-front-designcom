import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ParentWithChildren } from '../../models/parent_model';
import { ParentService } from '../../services/Parent/parent.service';

@Component({
  selector: 'app-parentprofil',
  imports: [CommonModule],
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
