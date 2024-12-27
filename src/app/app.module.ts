import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastModule} from "primeng/toast"
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { THEME_PRESET } from './settings/ui-presets';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import AuthInterceptor from '@core/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    providePrimeNG({
      theme: {
          preset: THEME_PRESET,
          options: {
            darkModeSelector: false || 'none',
    
        },
      },
      
  }),
  MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
