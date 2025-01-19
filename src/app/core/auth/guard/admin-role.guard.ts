import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private toast: ToastService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const path = route.pathFromRoot.map(r => r.routeConfig?.path).join('/').slice(1);

        if (path.startsWith('admin') && this.authService.getUserRole() === 'user') {
            this.toast.showWarn('You are not authorized to access this page');
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}