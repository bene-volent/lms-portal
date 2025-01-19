import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleRedirectGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        const currentUser = this.authService.getCurrentUser();

    
        if (currentUser && currentUser.role) {
            if (currentUser.role === 'teacher') {
                this.router.navigate(['/teacher/dashboard']);
                return false;
            } 
        }
        return true;
    }
}