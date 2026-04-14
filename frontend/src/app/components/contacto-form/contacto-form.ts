import { Component,  OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core'; // Importa signal

@Component({
  selector: 'app-contacto-form',  
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './contacto-form.html'
})
export class ContactoFormComponent implements OnInit {
  contactoForm: FormGroup;
  contactos = signal<any[]>([]);

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService
  ) {
    // Definimos los campos que coincidan con tu modelo de Prisma
    this.contactoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.obtenerTodos();
  }

  // Para leer de Prisma
  obtenerTodos() {
    this.contactoService.getContactos().subscribe(data => {
      this.contactos.set(data);  // 'contactos' es la variable que pintas en el HTML
      console.log('Datos cargados:', this.contactos);
    });
  }

  enviar() {
    if (this.contactoForm.valid) {
      this.contactoService.enviarContacto(this.contactoForm.value).subscribe({
        next: (respuesta) => {
          alert('¡Guardado!');
          this.contactoForm.reset();
          
          // AQUÍ ESTÁ EL TRUCO:
          this.obtenerTodos(); // Llamas a la función que hace el GET
        },
        error: (err) => console.error(err)
      });
    }
  }
  
}
