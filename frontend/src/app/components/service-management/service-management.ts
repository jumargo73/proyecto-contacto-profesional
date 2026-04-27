import { Component, OnInit  } from '@angular/core';
import { ContactoService } from '../../services/contacto';

@Component({
  selector: 'app-service-management',
  standalone: false,
  templateUrl: './service-management.html',
  styleUrl: './service-management.css',
})
export class ServiceManagement implements OnInit {

  constructor(
    private contactoService: ContactoService
  ){}

  services: any[] = [];

  ngOnInit() {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.contactoService.getContactos().subscribe(data => {
      this.services=data;  // 'contactos' es la variable que pintas en el HTML
      console.log('Datos cargados:', this.services);
    });
  }


  view(id: number){
    console.log('Viendo detalle de:', id);
  }


  update(id: number){
    console.log('Editando:', id);
  }

  delete(id: number){
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      console.log('Eliminando:', id);
      // Llama a tu servicio de API aquí
    }
  }



}
