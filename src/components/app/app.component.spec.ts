import i18nextConf from '#root/i18next.config';
import { AppComponent } from '#src/components/app/app.component';
import { InputComponent } from '#src/components/input/input.component';
import I18N_PROVIDERS from '#src/helpers/i18next.provider';
import { validUser } from '#src/mocks';
import { RegisterService } from '#src/services/register.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import i18n, { t } from 'i18next';
import { of, throwError } from 'rxjs';

(async () => await i18n.init(i18nextConf))();

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        I18NextModule.forRoot(),
        InputComponent,
        AppComponent
      ],
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
            getUserInfo() {
              return of({});
            },
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

    component.registerForm.controls['firstName'].setValue(validUser.firstName);
    component.registerForm.controls['lastName'].setValue(validUser.lastName);
    component.registerForm.controls['email'].setValue(validUser.email);
    component.registerForm.controls['password'].setValue(validUser.password);

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
            getUserInfo() {
              return throwError(() => new Error());
            },
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

    component.registerForm.controls['firstName'].setValue(validUser.firstName);
    component.registerForm.controls['lastName'].setValue(validUser.lastName);
    component.registerForm.controls['email'].setValue(validUser.email);
    component.registerForm.controls['password'].setValue(validUser.password);

    expect(component.registerForm.valid).toBeTruthy();

    component.onSubmit();
    fixture.detectChanges();

    expect(component.loading).toBeFalsy();
    expect(compiled.querySelector('#error')?.textContent).toContain(t('registerForm.submitError'));
  });
});
