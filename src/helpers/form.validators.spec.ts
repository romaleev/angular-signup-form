import { PasswordValidator } from '#src/helpers/form.validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('Form Validators', () => {
  const formBuilder = new FormBuilder();

  it('should validate correct form', () => {
    const registerForm: FormGroup = formBuilder.group({
      firstName: ['First', Validators.required],
      lastName: ['Last', Validators.required],
      email: ['my@email.com', [Validators.required, Validators.email]],
      password: ['asdffdsA', [Validators.required, Validators.minLength(8)]]
    });

    const { password, firstName, lastName } = registerForm.controls;

    registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
    registerForm.updateValueAndValidity();

    expect(
      Object.keys(registerForm.controls).every((name) => !registerForm['controls'][name].errors)
    ).toBeTruthy();
  });

  it('should require firstName, lastName, email and password', () => {
    const registerForm: FormGroup = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    const { password, firstName, lastName } = registerForm.controls;

    registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
    registerForm.updateValueAndValidity();

    expect(
      Object.keys(registerForm.controls).every(
        (name) => registerForm.controls[name].errors?.['required'] === true
      )
    ).toBeTruthy();
  });

  it('should show error if email is invalid', () => {
    const registerForm = formBuilder.group({
      firstName: ['First', Validators.required],
      lastName: ['Last', Validators.required],
      email: ['my@', [Validators.required, Validators.email]],
      password: ['asdffdsA', [Validators.required, Validators.minLength(8)]]
    });

    const { password, firstName, lastName } = registerForm.controls;

    registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
    registerForm.updateValueAndValidity();

    expect(registerForm.controls.email.errors).toEqual({ email: true });
  });

  it('should show error if password is too short', () => {
    const registerForm = formBuilder.group({
      firstName: ['First', Validators.required],
      lastName: ['Last', Validators.required],
      email: ['my@email.com', [Validators.required, Validators.email]],
      password: ['asdffds', [Validators.required, Validators.minLength(8)]]
    });

    const { password, firstName, lastName } = registerForm.controls;

    registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
    registerForm.updateValueAndValidity();

    expect(
      registerForm.controls.password.errors && registerForm.controls.password.errors['minlength']
    ).toBeTruthy();
  });

  it('should show error if password contain firstName', () => {
    const registerForm = formBuilder.group({
      firstName: ['First', Validators.required],
      lastName: ['Last', Validators.required],
      email: ['my@email.com', [Validators.required, Validators.email]],
      password: ['Firstasdffds', [Validators.required, Validators.minLength(8)]]
    });

    const { password, firstName, lastName } = registerForm.controls;

    registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
    registerForm.updateValueAndValidity();

    expect(
      registerForm.controls.password.errors && registerForm.controls.password.errors['containName']
    ).toBeTruthy();
  });

  it('should show error if password contain lastName', () => {
    const registerForm = formBuilder.group({
      firstName: ['First', Validators.required],
      lastName: ['Last', Validators.required],
      email: ['my@email.com', [Validators.required, Validators.email]],
      password: ['asdffdsLast', [Validators.required, Validators.minLength(8)]]
    });

    const { password, firstName, lastName } = registerForm.controls;

    registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
    registerForm.updateValueAndValidity();

    expect(
      registerForm.controls.password.errors && registerForm.controls.password.errors['containName']
    ).toBeTruthy();
  });

  it('should show error if password contain no upper and lower case letters', () => {
    const registerForm = formBuilder.group({
      firstName: ['First', Validators.required],
      lastName: ['Last', Validators.required],
      email: ['my@email.com', [Validators.required, Validators.email]],
      password: ['asdffdsa', [Validators.required, Validators.minLength(8)]]
    });

    const { password, firstName, lastName } = registerForm.controls;

    registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
    registerForm.updateValueAndValidity();

    expect(
      registerForm.controls.password.errors && registerForm.controls.password.errors['caseLetters']
    ).toBeTruthy();
  });
});
