import { InputComponent } from '#src/components/input/input.component';
import { EmailPattern, PasswordValidator } from '#src/helpers/form.validators';
import { RegisterService } from '#src/services/register.service';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { ObservableInput, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, NgIf, I18NextModule]
})
export class AppComponent implements OnInit {
  public registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(EmailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  public submitted = false;
  public success = false;
  public error = false;
  public loading = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {}

  ngOnInit(): void {
    const { password, firstName, lastName } = this.registerForm.controls;

    this.registerForm.setValidators(PasswordValidator(password, [firstName, lastName]));
  }

  // convenience getter for easy access to form controls
  get controls(): { [control: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.success = false;
    this.error = false;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    // option 1: using promises
    /*try {
      const user = await (this.registerService
        .getUserInfo().toPromise());
      await (this.registerService
        .register(this.registerForm.value).toPromise());
      this.loading = false;
      this.success = true;
      this.submitted = false;
      this.registerForm.reset();
    } catch (error) {
      this.loading = false;
      this.error = true;
    }*/

    // option 2: using observables
    this.registerService
      .getUserInfo()
      .pipe(
        switchMap(
          (value, index): ObservableInput<object> =>
            this.registerService.register(this.registerForm.value)
        )
      )
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
