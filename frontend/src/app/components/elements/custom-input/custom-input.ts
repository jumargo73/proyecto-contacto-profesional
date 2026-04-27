import { Component,Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-custom-input',
  standalone: true,
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  // Propiedades personalizadas
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() icon: string = ''; // Nombre del icono o clase
  @Input() error: string = ''; // Mensaje de error

  value: string = '';

  // Funciones que Angular usará internamente
  onChange: any = () => {};
  onTouched: any = () => {};

  // Cuando el valor cambia en el HTML
  updateValue(val: string) {
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  // Métodos obligatorios de ControlValueAccessor
  writeValue(value: any): void { this.value = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
