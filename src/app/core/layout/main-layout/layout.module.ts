import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent,FooterComponent,MenubarComponent } from '@core/components'
import { MainLayoutComponent } from './main-layout.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbComponent } from '@core/components/breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { ScrollTopModule} from 'primeng/scrolltop'
import { BadgeModule } from 'primeng/badge';
import { NotificationsComponent } from '@core/components/notifications/notifications.component';
import {ProgressSpinnerModule} from "primeng/progressspinner"
import { TimeAgoPipe } from '@core/pipe/time-ago.pipe';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenubarComponent,
    MainLayoutComponent,
    BreadcrumbComponent,
    NotificationsComponent,
    TimeAgoPipe

  ],
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    RouterModule,
    BreadcrumbModule,
    ScrollTopModule,
    BadgeModule,
    ProgressSpinnerModule,

  ],
  exports:[
    MainLayoutComponent
  ]
})
export class LayoutModule { }
