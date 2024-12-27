import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control :AbstractControl){
    if (control.value === null || control.value === '') {
        return { required: true };
    }

    if (control.value.length < 8) {
        return { minPasswordLength: true,minLength:8 ,actualLength:control.value.length};
    }
    if (!/[a-z]/.test(control.value)) {
        return { noLowerCase: true };
    }
    if (!/[A-Z]/.test(control.value)) {
        return { noUpperCase: true };
    }
    if (!/[0-9]/.test(control.value)) {
        return { noNumber: true };
    }
    if (!/[!\W_]/.test(control.value)) {
        return { noSpecialCharacter: true };
    }
    return null;

}

export function PasswordMatchValidator(control :AbstractControl){

    if (control.get('password')?.value === null || control.get('password')?.value === '') {
        return { required: true };
    }
    if (control.get('confirmPassword')?.value === null || control.get('confirmPassword')?.value === '') {
        return { required: true };
    }

    if (control.get('password')?.value !== control.get('confirmPassword')?.value) {

        return { passwordMismatch: true };
    }

    return null;
}