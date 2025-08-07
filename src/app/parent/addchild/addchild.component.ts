import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FdcLabelModule } from '@be-fgov-minfin/designcom-components';
import { ParentService } from '../../services/Parent/parent.service';

@Component({
  selector: 'app-addchild',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FdcLabelModule,
    MatButtonModule,
  ],
  templateUrl: './addchild.component.html',
  styleUrl: './addchild.component.scss',
})
export class AddchildComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private parentService = inject(ParentService);
  private route = inject(ActivatedRoute);

  private idParent = Number(this.route.snapshot.paramMap.get('idParent'));

  enfantForm: FormGroup = this.fb.group({
    nomEnfant: ['', Validators.required],
    prenomEnfant: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    commentaire: [''],
  });

  onSubmit() {
    if (this.enfantForm.invalid) return;

    const formData = {
      ...this.enfantForm.value,
      idParent: this.idParent,
    };

    this.parentService.addChild(formData).subscribe({
      next: () => this.router.navigate(['/parentprofil']),
      error: (err) => console.error('Erreur lors de l’ajout de l’enfant', err),
    });
  }
}
