import { TestBed } from '@angular/core/testing';
import { AppComponent } from '#src/app/app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputComponent } from '#src/app/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { I18N_PROVIDERS } from '#src/app/app.module';
import { I18NextModule } from 'angular-i18next';
import { RegisterService } from '#src/services/register.service';
import { of, throwError } from 'rxjs';
import i18n, { t } from 'i18next';
import i18nextConf from '#root/i18next.config';

(async () => await i18n.init(i18nextConf))();

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
    expect(compiled.querySelector('#success')?.textContent).toContain(
      t('registerForm.submitSuccess')
    );
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
    expect(compiled.querySelector('#error')?.textContent).toContain(t('registerForm.submitError'));
  });
});
