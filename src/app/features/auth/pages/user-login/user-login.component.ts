import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { LoginCredentials } from '@core/models';
import { ToastService } from '@core/services/toast.service';
import { PasswordValidator } from '@shared/utils/validators';

@Component({
  selector: 'app-user-login',
  standalone: false,

  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  formData = new FormGroup({
    loginID: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, PasswordValidator])
  })

  forgotPasswordEmail = new FormControl('', [Validators.required, Validators.email])

  strongValidation = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$'
  forgotPasswordModalvisible = false;


  constructor(private authService: AuthService, private toastService: ToastService, private destroyRef: DestroyRef, private router: Router) { }

  onSubmit() {
    if (this.formData.invalid) {
      const isEmailInvalid = this.formData.get('loginID')?.invalid
      const isPasswordInvalid = this.formData.get('password')?.invalid
      if (isEmailInvalid) {
        this.toastService.showError('Login ID is required')
      }
      if (isPasswordInvalid) {
        this.toastService.showError('Invalid Password')
        return
      }

    }

    const creds: LoginCredentials = {
      loginID: this.formData.get('loginID')!.value!,
      password: this.formData.get('password')!.value!
    }

    const subscription = this.authService.login(creds).subscribe({
      next: user => {
        this.toastService.showSuccess('Login Successful')
        this.router.navigate([''],)
      },
      error: err => {
        this.toastService.showError('Login Failed')
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe())


  }
  onForgotPassword() {

    if (this.forgotPasswordEmail.invalid)
      return
    this.forgotPasswordModalvisible = false;
  }
}
