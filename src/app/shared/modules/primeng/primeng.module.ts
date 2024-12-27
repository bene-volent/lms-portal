import { NgModule } from '@angular/core';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { Fluid } from 'primeng/fluid';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Fieldset } from 'primeng/fieldset';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { CarouselModule } from 'primeng/carousel';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    FloatLabel,
    Fluid,
    IconField,
    InputIcon,
    DialogModule,
    Fieldset,
    TooltipModule,
    TableModule,
    CarouselModule,
    TextareaModule,
    DatePickerModule,
    CheckboxModule,
    FileUploadModule
  ],
  exports:[
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    FloatLabel,
    Fluid,
    IconField,
    InputIcon,
    DialogModule,
    Fieldset,
    TooltipModule,
    CarouselModule,
    TableModule,
    TextareaModule,
    DatePickerModule,
    CheckboxModule,
    FileUploadModule
  ]
})
export class PrimeNGModule { }
