import { Component, OnInit  } from '@angular/core';
import { ContactoService } from '../../../services/contacto';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  services$!: Observable<any[]>;
  services: any[] = [];
  selectedService: any = {}; 
  showEditModal: boolean = false;
  nuevoEstado: string = '';
  opcionesEstado = ['PENDIENTE', 'EN_TRAMITE', 'FINALIZADO'];
  public registros: number = 0;
  miFormulario!: FormGroup;


  constructor(
    private contactoService: ContactoService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ){
    
    this.miFormulario = this.fb.group({
      idServicio: ['',Validators.required],
      cliente: ['', Validators.required],
      cedula: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      servicio: [''],
      descripcion: [''],
      estado: [''],
      fecha: ['']
    });

  }

 
 


 


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
      console.log('Entré al ServiceManagement') 
    //this.route.params.subscribe(params => {
      this.obtenerTodos();
    //});
  }

  obtenerTodos() {
    this.services$ = this.contactoService.getContactos().pipe(
      tap(datos => {
        console.log('Cantidad de registros:', datos.length);
        if (datos.length === 0) {
          // Aquí puedes disparar una alerta o lógica extra
        }
      })
    );
  }

  obtenerRegistro(id: number) {

    this.services$ = this.contactoService.getOne(id).pipe(
      tap(datos => {
        console.log('frontend obtenerRegistro Cantidad de registros:', datos.length);
        this.registros=datos.length
        console.log('frontend obtenerRegistro variable registros:', this.registros);
        if (datos.length === 1) {
            if (datos && datos.length > 0) {
              this.miFormulario.patchValue(datos[0]); 
        }
          this.showEditModal = true;
        }
      })
    );

    return this.registros

  }

  /*obtenerTodos() {
    this.contactoService.getContactos().subscribe(data => {
      this.services=data;  // 'contactos' es la variable que pintas en el HTML
      this.cd.detectChanges(); 
      console.log('Datos cargados:', this.services);
    });
  }*/


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
    alert("onUpdate activado")
    this.contactoService.getOne(id).subscribe(data => {
      // Aquí puedes abrir un modal con la info que devuelve el backend
      this.services=data; 
      console.log('Detalle recibido del servidor:', data);
      alert(`Mensaje completo: ${data.message}`);
    });
  }

  // ACTUALIZAR: Conecta con @Patch(':id')
  onUpdate(id: any) {

    console.log("frontend onUpdate activado")
    console.log("frontend onUpdate id",id)
    // 1. Forzamos el cierre y limpieza
    this.closeChanges();
    
    this.obtenerRegistro(id);
    // 2. Buscamos el objeto. Usamos == por si uno es string y otro número
    //const encontrado = this.services.find(s => s.idServicio == id);
  }

  saveChanges() {

    console.log('saveChanges ejecutado');
    const body = this.miFormulario.value;
    if (!body.idServicio) return;

    const dataToApi = {
        nombre: body.cliente,       // cliente -> nombre
        email: body.email,
        phone: body.phone,
        // La cédula normalmente no se edita, pero si tu DTO la pide:
        cedula: body.cedula,
        // Para el servicio:
        service: body.servicio,     // servicio -> subject
        descripcion: body.descripcion,
        estado: body.estado                   // El valor del select del modal
      };

      

    // 1. Llamada al servicio que conecta con @Patch(':id') en NestJS
    this.contactoService.actualizarServicio(body.idServicio, dataToApi).subscribe({
      next: (res) => {
        console.log('Registro actualizado en la DB y en la vista');
        this.closeChanges();
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

  probarClick() {
    alert('¡El botón sí responde!');
  }

  closeChanges(){
    this.showEditModal = false
    this.registros=0
    console.log('closeChanges registro',this.registros);
    console.log('closeChanges showEditModal',this.showEditModal);
  }
 
}
