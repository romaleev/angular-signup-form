import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { InputErrors } from '../../models/input.errors';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  // Use the @Input() decorator in a child component or directive to let Angular know that a property in that component can receive its value from its parent component.

  @Input() formControlName = '';
  @Input() title = '';
  @Input() type = '';
  @Input() submitted = false;
  @Input() errors: ValidationErrors | InputErrors | null = [];

  public value = '';
  public isDisabled = false;
  public onChange = (value: string) => {
    // onChanged event
  };
  public onTouched = () => {
    // onTouched event
  };

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
