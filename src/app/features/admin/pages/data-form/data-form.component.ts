import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { Subscription, take } from 'rxjs';
import { ToastService } from '@core/services/toast.service';
import { FileUploadHandlerEvent } from 'primeng/fileupload';

interface TableMetadata {
  attrsFull: string[];
  attrs: string[];
  types: string[];
  required: boolean[];
  name: string;
  id?: number;
  data?: any;
}

@Component({
  selector: 'app-data-form',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent {

  form: FormGroup | null = null;
  isEditMode = false;
  
  table: TableMetadata = {
    attrsFull: [],
    attrs: [],
    types: [],
    required: [],
    name: '',
    id: 0,
    data: {}
  };

  submitAction = 'save';
  subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const table = this.route.parent!.snapshot.paramMap.get('table');
    const id = this.route.snapshot.paramMap.get('id');
    
    if (table) {
      this.table.name = table;
      this.isEditMode = !!id;
      
      if (this.isEditMode && id) {
        this.getData(table, parseInt(id));
      }
      
      this.getFormAndTable(table);
    }
  }

  setAction(action: string) {
    this.submitAction = action;
  }

  onUpload(key: string, event: FileUploadHandlerEvent) {
    const file = event.files[0];
    this.form?.patchValue({ [key]: file });
  }

  getData(table: string, id: number) {
    this.adminService.getTableDataByID(table, id).pipe(take(1)).subscribe({
      next: (data) => {
        this.table.data = data;
        this.table.id = id;
        // console.log(data, id, this.table);
      },
      error: (error) => {
        this.toast.showError('Unable to get data');
        console.error(error);
      }
    });
  }


  submitForm() {
    if (this.form?.invalid) {
      this.toast.showError('Form is invalid');
      // console.log(this.form);
      return;
    }

    const data = this.form!.value;
    switch (this.submitAction) {
      case 'save':
        this.save(data);
        break;
      case 'saveAndAdd':
        this.saveAndAdd(data);
        break;
      case 'saveAndEdit':
        this.saveAndEdit(data);
        break;
    }
  }

  save(data: any) {
    const request = this.isEditMode
      ? this.adminService.changeData(this.table.name, this.table.id!, data)
      : this.adminService.addNewData(this.table.name, data);

    request.pipe(take(1)).subscribe({
      next: () => {
        this.toast.showSuccess('Data saved successfully');
        this.router.navigate(['admin', this.table.name]);
      },
      error: (error) => {
        this.toast.showError('Unable to save data');
        console.error(error);
      }
    });
  }

  saveAndAdd(data: any) {
    const request = this.isEditMode
      ? this.adminService.changeData(this.table.name, this.table.id!, data)
      : this.adminService.addNewData(this.table.name, data);

    request.pipe(take(1)).subscribe({
      next: () => {
        this.toast.showSuccess('Data saved successfully');
        this.form?.reset();
      },
      error: (error) => {
        this.toast.showError('Unable to save data');
        console.error(error);
      }
    });
  }


  saveAndEdit(data: any) {
    const request = this.isEditMode
      ? this.adminService.changeData(this.table.name, this.table.id!, data)
      : this.adminService.addNewData(this.table.name, data);

    request.pipe(take(1)).subscribe({
      next: () => {
        this.toast.showSuccess('Data saved successfully');
      },
      error: (error) => {
        this.toast.showError('Unable to save data');
        console.error(error);
      }
    });
  }

  deleteSelected() {
    if (!this.isEditMode || !this.table.id) return;

    this.adminService.deleteData(this.table.name, this.table.id).pipe(take(1)).subscribe({
      next: () => {
        this.toast.showSuccess('Data deleted successfully');
        this.router.navigate(['admin', this.table.name]);
      },
      error: (error) => {
        this.toast.showError('Unable to delete data');
        console.error(error);
      }
    });
  }

  getFormAndTable(table: string) {
    this.adminService.getFormFromTable(table).pipe(take(1)).subscribe({
      next: ({ form, table: tableData }) => {
        this.form = form;
        this.table.attrsFull = tableData.attributes
          .map(attribute => {
            const words = attribute.split('_');
            return words.map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
          })
          .slice(1);

        this.table.attrs = tableData.attributes.slice(1);
        this.table.types = tableData.types.slice(1);
        this.table.required = tableData.required.slice(1);
        // console.log(this.table);
        if (this.isEditMode && this.table.data) {
          this.table.attrs.forEach(attr => {
            if (this.table.data[attr]) {
              this.form?.patchValue({ [attr]: this.table.data[attr] });
            }
          });
        }
      },
      error: (error) => {
        this.toast.showError('Unable to create the form');
        console.error(error);
      }
    });
  }

}
