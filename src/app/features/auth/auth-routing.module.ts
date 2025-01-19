import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { RegisterComponent } from './pages/register/register.component';



const routes: Routes = [
    {
        path: 'login',
        component: UserLoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
