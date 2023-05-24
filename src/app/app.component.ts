import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '#src/helpers/password.validator';
import { RegisterService } from '#src/services/register.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
    ],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  submitted = false;
  success = false;
  error = false;
  loading = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {}

  ngOnInit(): void {
    const { password, firstName, lastName } = this.registerForm.controls;

    this.registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
  }

  // convenience getter for easy access to form fields
  get fields(): { [p: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.success = false;
    this.error = false;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.registerService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          this.success = true;
          this.submitted = false;
          this.registerForm.reset();
        },
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
  }
}
