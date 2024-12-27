import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { ViewComponent } from './pages/view/view.component';
import { AdminLayoutComponent } from './layout/admin-layout.component';

import { AuthPageModule } from '@shared/auth-page/auth-page.module';
import { LayoutModule } from "../../core/layout/main-layout/layout.module";

import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { DataFormComponent } from './pages/data-form/data-form.component';
import { FormBuilderService } from './service/form-builder.service';
import { AdminService } from './service/admin.service';
import { TableExistsGuard } from './guard/table-exists.guard';

@NgModule({
  declarations: [
    AdminComponent,
    ViewComponent,
    AdminLayoutComponent,
    DataFormComponent,
  ],
  providers: [
    FormBuilderService,
    AdminService,
    TableExistsGuard
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    AuthPageModule,
    LayoutModule,
    PrimeNGModule,

  ]
})
export class AdminModule { }
