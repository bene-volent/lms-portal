import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlreadyLoggedInGuard,NotLoggedInGuard } from '@core/auth/guard/index';
import { RoleRedirectGuard } from '@core/auth/guard/role-redirect.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',

  },
  {
    path: 'auth',
    canActivate: [NotLoggedInGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AlreadyLoggedInGuard,RoleRedirectGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
  },
  // {
  //   path:'register',
  //   pathMatch: 'full',
  //   canActivate: [NotLoggedInGuard],
  //   title: "Register",
  //   component: RegisterComponent,
    
  // }
  // ,
  // {
  //   path:'login',
  //   pathMatch: 'full',
  //   canActivate: [NotLoggedInGuard],
  //   title: "Login",
  //   component: UserLoginComponent,
    
  // },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () => import('./features/portal/portal.module').then(m => m.PortalModule),

  // },
  {
    path: 'admin',
    data: {
      breadcrumb: 'Admin'
    },
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
