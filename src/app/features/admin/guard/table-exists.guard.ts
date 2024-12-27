import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AdminService } from "../service/admin.service";
import {Table} from "../models/table.model";
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ToastService } from "@core/services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class TableExistsGuard implements CanActivate {

  constructor(private adminService: AdminService,private toastService: ToastService,private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot) {

    const modelName = route.paramMap.get('table');

    let tablesLoaded = true

    const val= this.adminService.tables$.pipe(
      take(1),
      map(tables => 
        { 
          if (!tables) {
            this.toastService.showError('Tables not loaded');
            this.router.navigate(['/admin']);
            tablesLoaded = false;
            return false;
          }
          return tables!.some(table => table.name.toLowerCase() === modelName)}
        )
    );
    
    val.subscribe((exists) => {
      if (!tablesLoaded) return;
      if (!exists) {
        this.toastService.showError(`Table ${modelName} does not exist`);
        this.router.navigate(['/admin']);
        return
      }
    });
    return val;
  }
}
