import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FdcBannerModule } from '@be-fgov-minfin/designcom-components';
import { PanierService } from '../../services/panier.service';
import { ParentService } from '../../services/Parent/parent.service';

@Component({
  selector: 'app-success',
  imports: [FdcBannerModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private panierService = inject(PanierService);
  private parentService = inject(ParentService);

  sessionId = signal<string | null>(null);
  bannerText = computed(() => {
    const id = this.sessionId();
    return id ? `Votre session id : ${id}` : 'Session inconnue';
  });

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('session_id');
    this.sessionId.set(id);
    console.log('Session ID:', id);
  }

  /*onBannerClose() {
    const sessionId = this.sessionId();

    if (!sessionId) {
      this.router.navigate(['/welcomePage']);
      return;
    }

    this.parentService.getParentWithChildren().subscribe({
      next: (parentWithChildren) => {
        const idParent = parentWithChildren.idParent;
        console.log('idParent récupéré =', idParent);

        this.panierService.confirmerPaiement(sessionId, idParent).subscribe({
          next: (message) => {
            console.log('Réponse du back: ', message);
            this.router.navigate(['/welcomePage']);
          },
          error: (err) => {
            console.error('Erreur lors de la confirmation de paiement', err);
            this.router.navigate(['/welcomePage']);
          },
        });
      },
      error: (err) => {
        console.error('Impossible de récupérer le parent', err);
        this.router.navigate(['/welcomePage']);
      },
    });
  }*/

  onBannerClose() {
    const sessionId = this.sessionId();

    if (!sessionId) {
      this.router.navigate(['/welcomePage']);
      return;
    }

    this.parentService.getParentWithChildren().subscribe({
      next: (parentWithChildren) => {
        const idParent = parentWithChildren.idParent;
        console.log('idParent récupéré =', idParent);

        // Étape 2 : récupérer le panier pour avoir montantAvecReduction
        this.panierService.getPanier(idParent).subscribe({
          next: (panier) => {
            const montant = panier.montantAvecReduction;
            console.log('Montant avec réduction =', montant);

            // Étape 3 : confirmer le paiement
            this.panierService
              .confirmerPaiement(sessionId, idParent, montant)
              .subscribe({
                next: (message) => {
                  console.log('Réponse du back: ', message);
                  this.router.navigate(['/welcomePage']);
                },
                error: (err) => {
                  console.error(
                    'Erreur lors de la confirmation de paiement',
                    err
                  );
                  this.router.navigate(['/welcomePage']);
                },
              });
          },
          error: (err) => {
            console.error('Impossible de récupérer le panier', err);
            this.router.navigate(['/welcomePage']);
          },
        });
      },
      error: (err) => {
        console.error('Impossible de récupérer le parent', err);
        this.router.navigate(['/welcomePage']);
      },
    });
  }
}
