import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './pages/portal/portal.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from '@core/auth/guard/auth.guard';
import { PortalLayoutComponent } from './layout/portal-layout.component';
import { AlreadyLoggedInGuard } from '@core/auth/guard';


const routes: Routes = [
  {
    path: '',
    component: PortalLayoutComponent,
    canActivate: [AlreadyLoggedInGuard],
    children:[
      {
        path:'',
        component: PortalComponent,
        title: "Dashboard",   
      }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
