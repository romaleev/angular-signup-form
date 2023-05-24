import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { I18N_PROVIDERS } from './app.module';
import { I18NextModule } from 'angular-i18next';
import { RegisterService } from '../services/register.service';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, InputComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, I18NextModule.forRoot()],
      providers: [I18N_PROVIDERS]
    });
  });

  it('should not submit invalid form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component.registerForm.valid).toBeFalsy();

    component.onSubmit();

    expect(compiled.querySelector('#success')).toBeFalsy();
    expect(compiled.querySelector('#error')).toBeFalsy();
  });

  it('should submit valid form', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RegisterService,
          useValue: {
            register() {
              return of({});
            }
          }
        }
      ]
    });

    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const component = fixture.componentInstance;

    component.registerForm.controls['firstName'].setValue('Roman');
    component.registerForm.controls['lastName'].setValue('M');
    component.registerForm.controls['email'].setValue('abc@aa.com');
    component.registerForm.controls['password'].setValue('abcdefgK');

    expect(component.registerForm.valid).toBeTruthy();

    component.onSubmit();
    fixture.detectChanges();

    expect(component.loading).toBeFalsy();
    expect(compiled.querySelector('#success')?.textContent).toContain('Registered successfully');
  });

  it('should display message on error', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RegisterService,
          useValue: {
            register() {
              return throwError(() => new Error());
            }
          }
        }
      ]
    });

    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const component = fixture.componentInstance;

    component.registerForm.controls['firstName'].setValue('Roman');
    component.registerForm.controls['lastName'].setValue('M');
    component.registerForm.controls['email'].setValue('abc@aa.com');
    component.registerForm.controls['password'].setValue('abcdefgK');

    expect(component.registerForm.valid).toBeTruthy();

    component.onSubmit();
    fixture.detectChanges();

    expect(component.loading).toBeFalsy();
    expect(compiled.querySelector('#error')?.textContent).toContain('Something went wrong');
  });
});
