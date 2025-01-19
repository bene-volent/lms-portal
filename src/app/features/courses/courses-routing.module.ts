import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseOverviewComponent } from './pages/course-overview/course-overview.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { AlreadyLoggedInGuard } from '@core/auth/guard';
import { ModuleDetailsComponent } from './pages/module-details/module-details.component';
import { ContentComponent } from './pages/content/content.component';
import { QuizStartComponent } from './pages/quiz-start/quiz-start.component';

import { CourseRegisteredGuard } from './guard/course-registered.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    
        {
            path: ':course-id/overview',
            component: CourseOverviewComponent,
            pathMatch: 'full',
            canActivate: [AlreadyLoggedInGuard],
          },
  {
    path:':course-id',
    component:LayoutComponent,
    canActivate: [AlreadyLoggedInGuard, CourseRegisteredGuard],

    children:[
        
          {
            path: '',
            component: CourseDetailsComponent,
          },
          {
            path: ':module-id',
            component: ModuleDetailsComponent,
            
          },
          {
            path: ':module-id/c/:content-id',
            component: ContentComponent,
          },
          {
            path: ':module-id/q/:quiz-id',
            component: QuizStartComponent,
          },
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
