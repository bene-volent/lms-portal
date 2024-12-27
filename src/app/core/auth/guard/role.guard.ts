
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService,private toastService: ToastService) { }
  canActivate(){ 

    // check if user is user
    if(this.authService.isAuthenticated() && this.authService.getUserRole() === 'user'){
      this.toastService.showWarn('You are not authorized to access this page')
      return false
    }
    return true;
  }
}