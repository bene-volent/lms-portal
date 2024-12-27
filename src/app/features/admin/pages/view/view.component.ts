import { Component, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { AdminService } from '../../service/admin.service';
import { ToastService } from '../../../../core/services/toast.service';
import { take } from 'rxjs';
import { Table } from '../../models/table.model';

@Component({
  selector: 'app-view',
  standalone: false,

  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  tableName: string | null = ''
  table: Table | null = null;
  tableData: any[] = [];
  loading = false;

  defaultRowsPerPage = 10;
  totalRecords = 10

  selectedRows: any[] = [];
  constructor(private adminService: AdminService, private toastService: ToastService, private authService: AuthService, private destroyRef: DestroyRef, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.tableName = this.route.snapshot.paramMap.get('table')
    if (this.tableName) {
      this.getTable(this.tableName)
      this.getTableDataByQuery(this.tableName,0, this.defaultRowsPerPage)
      this.getTotalRecords(this.tableName)
    }
  }

  getValueFromField(eventTarget: EventTarget | null) {
    if (eventTarget instanceof HTMLInputElement) {
      return eventTarget.value
    }
    return null;
  }

  getUser() {
    return this.authService.getCurrentUser();
  }

  getTable(name: string) {
    this.loading = true
    this.adminService.getTable(name).subscribe({
      next: (table) => {
        this.table = table;
        // console.log(table)
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.toastService.showError("Error while fetching" + name + " data")
      }
    })

  }

  getTableData(name: string) {

    this.adminService.getTableData(name).subscribe({
      next: (data) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getTotalRecords(name: string) {
    this.adminService.getTableDataCount(name).subscribe({
      next: (data) => {
        this.totalRecords = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getTableDataByQuery(name: string, page:number, limit:number) {
    this.adminService.getTableDataByQuery(name, `page=${0}&limit=${limit}`).subscribe({
      next: (data) => {
        this.tableData = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  onPageHandler(event: any) {
    this.getTableDataByQuery(this.tableName!, event.page, event.limit)
    this.getTotalRecords(this.tableName!)
    
  }

  deleteSelected() {
    // // console.log(this.selectedRows)
    if (this.table && this.selectedRows.length > 0) {
      let deleteCountdown = this.selectedRows.length

      this.selectedRows.forEach((row) => {

        // // console.log(index)
        this.adminService.deleteData(this.table!.name, row.id).subscribe({
          next: (data) => {
            this.tableData = this.tableData.filter((item) => item.id !== row.id)
            deleteCountdown--
          },
          error: (error) => {
            this.toastService.showError('Error while deleting data: '+ row.id)
            console.error(error)
          },
          complete: () => {
            if (deleteCountdown === 0) {
              this.toastService.showSuccess('Data deleted successfully')
            }
          }
        })
      })
    }
  }

}
