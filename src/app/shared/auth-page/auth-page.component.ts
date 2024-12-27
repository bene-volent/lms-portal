import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
  standalone: false
})
export class AuthPageComponent {
  @Input({alias:"form-width"}) width: string = '40rem';
  @Input({alias:"form-height"}) formHeight: string = '30rem';
 }
