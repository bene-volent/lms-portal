import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private toast:ToastService) { }
  canActivate(route: ActivatedRouteSnapshot) {
    const path = route.pathFromRoot.map(r => r.routeConfig?.path).join('/').slice(1); // in case the route is lazy loaded
    // console.log(path, this.authService.isAuthenticated(),this.authService.getCurrentUser(),this.authService.getUserRole(),path.startsWith('/login'));
    // return false



    if (!this.authService.isAuthenticated() ) {
      if (!path.startsWith('login') && !path.startsWith('register')){
        this.toast.showInfo('Please login to access this page');
        this.router.navigate(['/login']);
        // console.log(false)
        return false;
      }
    // console.log(true)

      return true
    }
    else{
      if (path.startsWith('login') || path.startsWith('register')){
        this.toast.showWarn('You are already logged in');
        this.router.navigate(['/']);
        // console.log(false)

        return false;
      }

      if (path.startsWith('admin') && this.authService.getUserRole() === 'user'){
        this.toast.showWarn('You are not authorized to access this page');
        this.router.navigate(['/']);
        // console.log(false)

        return false;
      } 
    }
    // console.log(true)

    return true
  }

}
