import { Component } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService:AuthService) {}

  continue:boolean = true;

  getCurrentUser(){
    return this.authService.getCurrentUser()
  }
}
