import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard,AlreadyLoggedInGuard,NotLoggedInGuard } from '@core/auth/guard/index';
import { RegisterComponent } from './features/portal/pages/register/register.component';
import { UserLoginComponent } from './features/portal/pages/user-login/user-login.component';


const routes: Routes = [

  {
    path:'register',
    pathMatch: 'full',
    canActivate: [NotLoggedInGuard],
    title: "Register",
    component: RegisterComponent,
    
  }
  ,
  {
    path:'login',
    pathMatch: 'full',
    canActivate: [NotLoggedInGuard],
    title: "Login",
    component: UserLoginComponent,
    
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/portal/portal.module').then(m => m.PortalModule),

  },
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
