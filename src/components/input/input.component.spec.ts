import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from '#src/components/input/input.component';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from '#src/helpers/i18next';
import i18n, { t } from 'i18next';
import i18nextConf from '#root/i18next.config';

(async () => await i18n.init(i18nextConf))();

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  const title = t('registerForm.firstName');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18NextModule.forRoot(), InputComponent],
      providers: [I18N_PROVIDERS]
    });
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should correctly render the passed @Input "formControlName" value', () => {
    component.formControlName = 'firstName';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').getAttribute('for')).toBe(component.formControlName);
    expect(compiled.querySelector('input').getAttribute('id')).toBe(component.formControlName);
  });

  it('should correctly render the passed @Input "title" value', () => {
    component.title = title;
    component.onChange(title);
    component.onTouched();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toBe(component.title);
  });

  it('should correctly render the passed @Input "isDisabled" value', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').getAttribute('disable')).toBeFalsy();
  });

  it('should correctly render the passed @Input "type" value', () => {
    component.type = 'text';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').getAttribute('type')).toBe(component.type);
  });

  it('should correctly render the passed @Input "errors" and "submitted" values', () => {
    component.title = title;
    component.submitted = true;
    component.errors = { required: true };
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.invalid-feedback').textContent).toBe(
      t('errors.required', { title })
    );
  });
});
