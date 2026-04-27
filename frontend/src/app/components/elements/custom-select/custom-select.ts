import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from './select-option.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-custom-select',
  standalone: true,
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.css',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: SelectOption[] = []; // La lista de opciones
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() error: string = '';

  value: any = null;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void { this.value = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  updateValue(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}
