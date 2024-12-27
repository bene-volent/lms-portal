import { Component, DestroyRef } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { AdminService } from '../../service/admin.service';
import { Table } from '../../models/table.model';

@Component({
  selector: 'app-admin',
  standalone: false,
  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  tables: Table[] = [];


  constructor(private adminService: AdminService,private authService: AuthService,private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.getTables()
  }

  getUser(){
    return this.authService.getCurrentUser();
  }
  getTables(){
    const subscription = this.adminService.tables$.subscribe({
      next: (tables) => {
        this.tables = tables;
      },
      error: (error) => {
        console.error(error);
      }
    })

    this.destroyRef.onDestroy(()=>subscription
  )  
}

  // get non auth tables ie not Users and Roles
  getNonAuthTables(){
    return this.tables.filter(table => table.name !== 'Users' && table.name !== 'Roles');
  }

  


}
