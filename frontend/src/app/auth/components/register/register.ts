import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',  
  imports:[CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register implements  OnInit {

  registerForm: FormGroup;
  errorMessage="";
  enviando=false

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private cd: ChangeDetectorRef
  
    ) {
      // Definimos los campos que coincidan con tu modelo de Prisma
      this.registerForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required]]
      });
    }
  
  ngOnInit(){

  }

  onRegister(){
    this.enviando = true;     
      this.authService.register(this.registerForm.value).subscribe({       
        next: (respuesta) => { // Aquí le decimos el tipo
          localStorage.setItem('token', respuesta.access_token);
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage=err.error.message
          this.cd.detectChanges();
          console.error('Respuesta desde Backend', this.errorMessage);
        } 
      });
  }


}
