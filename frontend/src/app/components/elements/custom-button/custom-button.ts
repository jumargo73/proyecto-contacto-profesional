import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.css',
})
export class CustomButtonComponent {
  // Para elegir el estilo: 'primary', 'danger', 'outline'
  @Input() variant: 'primary' | 'danger' | 'outline' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false; // ¿Está cargando?
  @Input() icon: string = ''; // Icono opcional

  @Output() btnClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled && !this.isLoading) {
      this.btnClick.emit();
    }
  }
}