import { Component, OnInit  } from '@angular/core';
import { ContactoService } from '../../../services/contacto';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, // 2. Agrégalo aquí 👈
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './service-management.html',
  styleUrl: './service-management.css',
})
export class ServiceManagement implements OnInit {

  constructor(
    private contactoService: ContactoService,
    private cd: ChangeDetectorRef
  ){}

  services: any[] = [];
  selectedService: any = {}; 
  showEditModal: boolean = false;
  nuevoEstado: string = '';
  opcionesEstado = ['PENDIENTE', 'EN_TRAMITE', 'FINALIZADO'];


  // En tu componente.ts
  getEstadoClass(estado: string): string {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold ';
    
    // Definimos las llaves permitidas
    const styles: { [key: string]: string } = {
      'PENDIENTE': 'bg-slate-200 text-slate-700',
      'EN_TRAMITE': 'bg-amber-100 text-amber-700',
      'FINALIZADO': 'bg-emerald-100 text-emerald-700'
    };

    // Si el estado no existe en el objeto, devolvemos un color gris por defecto
    const colorClass = styles[estado] || 'bg-gray-100 text-gray-600';
    
    return base + colorClass;
  }


  ngOnInit() {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.contactoService.getContactos().subscribe(data => {
      this.services=data;  // 'contactos' es la variable que pintas en el HTML
      console.log('Datos cargados:', this.services);
    });
  }


  // ELIMINAR: Conecta con @Delete(':id')
  onDelete(id: number) {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
      this.contactoService.eliminarServicio(id).subscribe({
        next: () => {
          // Filtramos el array localmente para actualizar la vista sin recargar
          this.services = this.services.filter(item => item.id !== id);
          console.log('Eliminado correctamente');
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  // VER: Conecta con @Get(':id')
  onView(id: number) {
    this.contactoService.getOne(id).subscribe(data => {
      // Aquí puedes abrir un modal con la info que devuelve el backend
      this.services=data; 
      console.log('Detalle recibido del servidor:', data);
      alert(`Mensaje completo: ${data.message}`);
    });
  }

  // ACTUALIZAR: Conecta con @Patch(':id')
  onUpdate(id: any) {
    // 1. Forzamos el cierre y limpieza
    this.showEditModal = false;
    
    // 2. Buscamos el objeto. Usamos == por si uno es string y otro número
    const encontrado = this.services.find(s => s.idServicio == id);

    if (encontrado) {
      // 3. Clonamos la data
      this.selectedService = { ...encontrado };
      this.nuevoEstado = this.selectedService.estado; 

      setTimeout(() => {
        this.nuevoEstado = this.selectedService.estado; // Asegúrate que esta variable es la del [(ngModel)]
        console.log('Estado sincronizado:', this.nuevoEstado);
      });
      
      // 4. Abrimos el modal
      this.showEditModal = true;
      
      console.log('Abriendo modal para:', this.selectedService.cliente);
      console.log('Abriendo modal para:', this.nuevoEstado);
    } else {
      console.error('No se encontró el servicio con ID:', id);
    }
  }

  saveChanges() {

    console.log('saveChanges ejecutado');
    if (!this.selectedService.idServicio) return;

    const dataToApi = {
        nombre: this.selectedService.cliente,       // cliente -> nombre
        email: this.selectedService.email,
        phone: this.selectedService.phone,
        // La cédula normalmente no se edita, pero si tu DTO la pide:
        cedula: this.selectedService.cedula,
        // Para el servicio:
        service: this.selectedService.servicio,     // servicio -> subject
        descripcion: this.selectedService.descripcion,
        estado: this.selectedService.estado                   // El valor del select del modal
      };

      

    // 1. Llamada al servicio que conecta con @Patch(':id') en NestJS
    this.contactoService.actualizarServicio(this.selectedService.idServicio, dataToApi).subscribe({
      next: (res) => {
        console.log('Registro actualizado en la DB y en la vista');
        this.showEditModal = false;
        this.obtenerTodos(); // Refresca la tabla        
        this.cd.detectChanges();        
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.cd.detectChanges();
        alert('No se pudo actualizar el registro');
      }
    });
  }

}
