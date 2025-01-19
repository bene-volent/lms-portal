import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    ModalComponent,

  ],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports:[
    ModalComponent
  ]
})
export class SharedModule { }
