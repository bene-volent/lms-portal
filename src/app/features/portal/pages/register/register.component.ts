import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { RegisterCredentials } from '@core/models';
import { ToastService } from '@core/services/toast.service';
import { PasswordMatchValidator, PasswordValidator } from '@shared/utils/validators';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formData = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, PasswordValidator]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [PasswordMatchValidator])
  })
  strongValidation = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$'

    constructor(private authService: AuthService, private toastService: ToastService, private destroyRef: DestroyRef, private router: Router) { }
  

  onSubmit(){
    if (this.formData.invalid){
      const isUsernameInvalid = this.formData.get('username')?.invalid
      const isFnameInvalid = this.formData.get('fname')?.invalid
      const isLnameInvalid = this.formData.get('lname')?.invalid
      const isEmailInvalid = this.formData.get('email')?.invalid
      const isMobileInvalid = this.formData.get('mobile')?.invalid
      const isPasswordInvalid = this.formData.get('passwords.password')?.invalid
      const isConfirmPasswordInvalid = this.formData.get('passwords.confirmPassword')?.invalid
      const isPaswordMismatch = this.formData.get('passwords')?.invalid
      if (isUsernameInvalid){
        this.toastService.showError('Username is required')
      }
      if (isFnameInvalid){
        this.toastService.showError('First Name is required')
      }
      if (isLnameInvalid){
        this.toastService.showError('Last Name is required')
      }
      if (isEmailInvalid){
        this.toastService.showError('Email is required')
      }
      if (isMobileInvalid){
        this.toastService.showError('Mobile is required')
      }
      if (isPasswordInvalid){
        this.toastService.showError('Invalid Password')
      }
      if (isConfirmPasswordInvalid){
        this.toastService.showError('Confirm Password is required')
      }
      if (isPaswordMismatch){
        this.toastService.showError('Password Mismatch')
      }
      return
    }

    const creds:RegisterCredentials = {
      username: this.formData.get('username')!.value!,
      firstName: this.formData.get('fname')!.value!,
      lastName: this.formData.get('lname')!.value!,
      email: this.formData.get('email')!.value!,
      mobile: this.formData.get('mobile')!.value!,
      password: this.formData.get('passwords.password')!.value!
    }

    const subscription = this.authService.registerUser(creds).subscribe({
      next: user => {
        this.toastService.showSuccess('Registration Successful')
        this.router.navigate([''])
      },
      error: err => {
        this.toastService.showError('Registration Failed')
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe())



  }

}
