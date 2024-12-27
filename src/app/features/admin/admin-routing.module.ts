import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from '@core/auth/guard/auth.guard';
import { RoleGuard } from '@core/auth/guard/role.guard';
import { ViewComponent } from './pages/view/view.component';
import { TableExistsGuard } from './guard/table-exists.guard';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { DataFormComponent } from './pages/data-form/data-form.component';
import { AlreadyLoggedInGuard } from '@core/auth/guard';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AlreadyLoggedInGuard, RoleGuard],
    title: "Admin",
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: ':table',
        canActivate: [TableExistsGuard],
        canActivateChild: [],
        data: {
          breadcrumb: 'Table',
          key: 'table',
        },
        children: [
          {
            path: '',
            component: ViewComponent,

          },
          {
            path: 'add',
            component: DataFormComponent,
            data: {
              breadcrumb: 'Add'
            }
          },
          {
            path: ':id/edit',
            component: DataFormComponent,
            data: {
              breadcrumb: 'Edit',
              key: 'id'
            }
          },

        ]
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
