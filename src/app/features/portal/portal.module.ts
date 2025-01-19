import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './pages/portal/portal.component';
import { PortalLayoutComponent } from './layout/portal-layout.component';
import { CardSectionComponent } from './components/card-section/card-section.component';

import { LayoutModule } from '@core/layout/main-layout/layout.module';

import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProgressTrackComponent } from './components/progress-track/progress-track.component';

import { SharedModule } from '@shared/shared.module';
import { CourseHomeComponent } from './pages/course-home/course-home.component';
@NgModule({
  declarations: [
    PortalComponent,

    PortalLayoutComponent,
    CardSectionComponent,
    ProgressBarComponent,
    ProgressTrackComponent,
    CourseHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PortalRoutingModule,
    LayoutModule,
    PrimeNGModule,
    SharedModule

  ]
})
export class PortalModule { }
