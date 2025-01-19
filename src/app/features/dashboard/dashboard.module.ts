import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

import { LayoutModule } from '@core/layout/main-layout/layout.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LearningComponent } from './pages/learning/learning.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CoursesComponent } from './component/courses/courses.component';
import { CourseComponent } from './component/course/course.component';
import { MockTestsComponent } from './component/mock-tests/mock-tests.component';
import { PhysicalsComponent } from './component/physicals/physicals.component';

import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    DashboardComponent,
    LearningComponent,
    ProfileComponent,
    CoursesComponent,
    CourseComponent,
    MockTestsComponent,
    PhysicalsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    PrimeNGModule
  ]
})
export class DashboardModule { }
