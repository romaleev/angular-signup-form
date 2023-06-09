import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const EmailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const PasswordValidator =
  (passwordControl: AbstractControl, excludeControls: AbstractControl[]): ValidatorFn =>
  (): ValidationErrors | null => {
    if (
      passwordControl.errors &&
      !passwordControl.errors['containName'] &&
      !passwordControl.errors['caseLetters']
    ) {
      // return if another validator has already found an error on the matchingControl
      return null;
    }

    if (
      excludeControls.some(
        (excludeControl: AbstractControl) =>
          excludeControl.value && passwordControl.value.includes(excludeControl.value)
      )
    ) {
      passwordControl.setErrors({ containName: true });
      return null;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(passwordControl.value)) {
      passwordControl.setErrors({ caseLetters: true });
      return null;
    }

    passwordControl.setErrors(null);
    return null;
  };
