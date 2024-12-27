import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';


@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    CardModule,
    ScrollPanelModule
  ],
  exports: [AuthPageComponent]

})
export class AuthPageModule { }
