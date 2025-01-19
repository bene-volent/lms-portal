import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private toast:ToastService) { }

  canActivate(route: ActivatedRouteSnapshot) {

      // const path = route.pathFromRoot.map(r => r.routeConfig?.path).join('/').slice(1); // in case the route is lazy loaded
      if (this.authService.isAuthenticated() ) {
        this.toast.showWarn('You are already logged in');
        this.router.navigate(['/dashboard']);
        return false
      }
      return true
    
  }

}
