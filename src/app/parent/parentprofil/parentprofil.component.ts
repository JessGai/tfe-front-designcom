import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-parentprofil',
  imports: [CommonModule],
  templateUrl: './parentprofil.component.html',
  styleUrl: './parentprofil.component.scss',
})
export class ParentprofilComponent {
  auth = inject(AuthService);
}
