import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageModule } from '@shared/auth-page/auth-page.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    UserLoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule,
    PrimeNGModule,
    ReactiveFormsModule,
    FormsModule,
    AuthPageModule,

  ]
})
export class AuthModule { }
