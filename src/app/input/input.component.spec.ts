import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from '../app.module';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [I18NextModule.forRoot()],
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
    component.title = 'First Name';
    component.onChange('First Name');
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
    component.title = 'First Name';
    component.submitted = true;
    component.errors = { required: true };
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.invalid-feedback').textContent).toBe('First Name is required');
  });
});
