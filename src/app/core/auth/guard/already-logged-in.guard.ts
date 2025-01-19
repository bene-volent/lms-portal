import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toast: ToastService) { }
  canActivate(route: ActivatedRouteSnapshot) {


    const path = route.pathFromRoot.map(r => r.routeConfig?.path).join('/').slice(1); // in case the route is lazy loaded
    console.log(path, this.authService.isAuthenticated(),this.authService.getCurrentUser(),this.authService.getUserRole(),path.startsWith('/login'));  
    if (!this.authService.isAuthenticated()) {
      this.toast.showInfo('Please login to access this page');
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true
    

  }

}
