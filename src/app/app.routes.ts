import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { CreatestagedescComponent } from './administrateur/createstagedesc/createstagedesc.component';
import { CreatestageinstComponent } from './administrateur/createstageinst/createstageinst.component';
import { EditstageinstComponent } from './administrateur/editstageinst/editstageinst.component';
import { StagedetailComponent } from './administrateur/stagedetail/stagedetail.component';
import { WelcomePageComponent } from './common/welcome-page/welcome-page.component';
import { HistoriqueComponent } from './parent/historique/historique.component';
import { InscriptionComponent } from './parent/inscription/inscription.component';
import { ParentprofilComponent } from './parent/parentprofil/parentprofil.component';
import { SandboxComponent } from './sandbox/sandbox.component';

export const routes: Routes = [
  {
    path: 'stagedetail/:idStageInst',
    component: StagedetailComponent,
  },
  {
    path: 'createstageinst/:idStageDesc',
    component: CreatestageinstComponent,
  },
  {
    path: 'editstageinst/:idStageDesc',
    component: EditstageinstComponent,
  },
  {
    path: 'createstagedesc',
    component: CreatestagedescComponent,
  },
  {
    path: 'parentprofil',
    canActivate: [AuthGuard],
    component: ParentprofilComponent,
  },
  {
    path: 'historique',
    canActivate: [AuthGuard],
    component: HistoriqueComponent,
  },
  {
    path: 'inscription',
    canActivate: [AuthGuard],
    component: InscriptionComponent,
  },
  {
    path: 'administrateur',
    canActivate: [AuthGuard],
    component: AdministrateurComponent,
  },
  {
    path: 'sandbox',
    component: SandboxComponent,
  },
  {
    path: 'welcomePage',
    component: WelcomePageComponent,
  },
  {
    path: '',
    redirectTo: 'welcomePage',
    pathMatch: 'full',
  },
];
