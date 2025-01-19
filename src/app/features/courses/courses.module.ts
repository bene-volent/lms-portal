import { LayoutModule } from '@core/layout/main-layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesDashboardComponent } from './pages/courses-dashboard/courses-dashboard.component';
import { CourseOverviewComponent } from './pages/course-overview/course-overview.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { ModuleDetailsComponent } from './pages/module-details/module-details.component';
import { ContentComponent } from './pages/content/content.component';
import { QuizStartComponent } from './pages/quiz-start/quiz-start.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { LayoutComponent } from './layout/layout.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { ProgressTrackComponent } from './components/progress-track/progress-track.component';
import { SharedModule } from '@shared/shared.module';

import {ProgressBarModule} from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    CoursesDashboardComponent,
    CourseOverviewComponent,
    CourseDetailsComponent,
    ModuleDetailsComponent,
    ContentComponent,
    QuizStartComponent,
    QuizComponent,
    LayoutComponent,
    ProgressTrackComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CoursesRoutingModule,
    PrimeNGModule,
    SharedModule,
    ProgressBarModule,
    AccordionModule
  ]
})
export class CoursesModule { }
