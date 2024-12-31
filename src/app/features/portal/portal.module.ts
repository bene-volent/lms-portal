import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './pages/portal/portal.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PortalLayoutComponent } from './layout/portal-layout.component';
import { CardSectionComponent } from './components/card-section/card-section.component';
import { SubjectModalComponent } from './components/subject-modal/subject-modal.component';

import { AuthPageModule } from '@shared/auth-page/auth-page.module';
import { LayoutModule } from '@core/layout/main-layout/layout.module';

import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProgressTrackComponent } from './components/progress-track/progress-track.component';


@NgModule({
  declarations: [
    PortalComponent,
    UserLoginComponent,
    RegisterComponent,
    PortalLayoutComponent,
    CardSectionComponent,
    SubjectModalComponent,
    ProgressBarComponent,
    ProgressTrackComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PortalRoutingModule,
    AuthPageModule,
    LayoutModule,
    PrimeNGModule

  ]
})
export class PortalModule { }
