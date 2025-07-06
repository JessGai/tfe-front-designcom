import { AsyncPipe, DOCUMENT, JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FdcProfileButtonModule } from '@be-fgov-minfin/designcom-components';
import { tokenToString } from 'typescript';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
    FdcProfileButtonModule,
    JsonPipe,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly email = 'info@KidsCamp.com';
  //authentification
  document = inject(DOCUMENT);
  auth = inject(AuthService);

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }

  //menu parent
  protected readonly menuItems = [
    {
      label: 'Mes données',
      icon: 'person',
      routerLink: '/parentprofil',
    },
    {
      label: 'Historique',
      icon: 'clock',
      routerLink: '/historique',
    },
  ];

  //a supprimer une fois ok
  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      console.log('Authentifié ?', loggedIn);
      console.log('token', tokenToString);
    });

    this.auth.getAccessTokenSilently().subscribe({
      next: (token) => console.log('🪪 Access Token:', token),
      error: (err) => console.error('❌ Erreur Auth0:', err),
    });
  }
}
