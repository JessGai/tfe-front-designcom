import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FdcLabelModule } from '@be-fgov-minfin/designcom-components';
import { take } from 'rxjs';
import { ParentService } from '../../services/Parent/parent.service';

@Component({
  selector: 'app-parent-inscription',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FdcLabelModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './parent-inscription.component.html',
  styleUrl: './parent-inscription.component.scss',
})
export class ParentInscriptionComponent {
  loading = true;

  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  auth = inject(AuthService);
  parentService = inject(ParentService);

  parentInscriptionForm: FormGroup = this.formBuilder.group({
    nomParent: ['', [Validators.required]],
    prenomParent: ['', Validators.required],
    adresse: ['', Validators.required],
    codePostal: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    commune: ['', Validators.required],
    telephone1: ['', Validators.required],
    telephone2: [''],
  });

  onSubmit() {
    if (this.parentInscriptionForm.invalid) return;

    this.auth.user$.pipe(take(1)).subscribe((user) => {
      if (!user) return;

      const formData = {
        ...this.parentInscriptionForm.value,
        email: user.email,
        auth0UserId: user.sub,
      };

      this.parentService.createParent(formData).subscribe({
        next: () => {
          this.router.navigate(['/parentprofil']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du parent', err);
        },
      });
    });
  }
}
