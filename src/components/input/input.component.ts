import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { InputErrors } from '#src/models/input.errors';
import { I18NextModule } from 'angular-i18next';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ],
  standalone: true,
  imports: [NgClass, NgIf, I18NextModule]
})
export class InputComponent implements ControlValueAccessor {
  // Use the @Input() decorator in a child component or directive to let Angular know that a property in that component can receive its value from its parent component.

  @Input() public formControlName = '';
  @Input() public title = '';
  @Input() public type = '';
  @Input() public submitted = false;
  @Input() public errors: ValidationErrors | InputErrors | null = [];

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
