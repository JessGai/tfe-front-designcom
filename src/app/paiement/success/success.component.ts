import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FdcBannerModule } from '@be-fgov-minfin/designcom-components';

@Component({
  selector: 'app-success',
  imports: [FdcBannerModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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

  onBannerClose() {
    this.router.navigate(['/welcomePage']); // redirige vers la page d'accueil
  }
}
