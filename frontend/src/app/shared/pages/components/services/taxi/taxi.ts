import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { ChangeDetectorRef } from '@angular/core';
import { TaxiServices } from '../../../../../services/taxi-services';
import { HttpErrorResponse } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-taxi',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './taxi.html',
  styleUrl: './taxi.css',
  
})
export class Taxi implements OnInit {

  taxiForm: FormGroup;
  enviando = false;
  errorMessage: string = ''; 

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private taxiServices: TaxiServices,
    private zone: NgZone,
    private router: Router,

  ) {

    this.taxiForm = this.fb.group({
      nombre: ['', [Validators.required]],
      phone: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      rutaIni: ['',[Validators.required]],
      rutaFin: ['',[Validators.required]]
    });

  }

  ngOnInit(): void {
    
  }

  onReserve(){

    this.taxiServices.solicitar_taxi(this.taxiForm.value).subscribe({
      next: (response) => {
        //console.log("Respuesta recibida desde authService frontend",response)
        //console.log("Respuesta recibida desde authService frontend token", localStorage.getItem('access_token'))
        //console.log("Respuesta recibida desde authService frontend user",localStorage.getItem('userName')) 
        // Solo nos preocupamos por la navegación
        this.zone.run(() => {
          //console.log("Antes de Redirect /dashboard")
          this.router.navigate(['/inicio']);
        });
        
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage=err.error.message
        this.cd.detectChanges();
        console.error('Respuesta desde Backend', this.errorMessage);
      }
    });
    
  }
}
