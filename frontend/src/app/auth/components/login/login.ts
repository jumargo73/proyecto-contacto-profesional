import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  imports:[CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements  OnInit {

  loginForm: FormGroup;
  enviando = false;
  errorMessage: string = ''; 
  isApiOk=false
 
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private cd: ChangeDetectorRef

  ) {
    // Definimos los campos que coincidan con tu modelo de Prisma
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit() {
   
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        //console.log("Respuesta recibida desde authService frontend",response)
        //console.log("Respuesta recibida desde authService frontend token", localStorage.getItem('access_token'))
        //console.log("Respuesta recibida desde authService frontend user",localStorage.getItem('userName')) 
        // Solo nos preocupamos por la navegación
        this.zone.run(() => {
          //console.log("Antes de Redirect /dashboard")
          this.router.navigate(['/dashboard']);
        });
        
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage=err.error.message
        this.cd.detectChanges();
        console.error('Respuesta desde Backend', this.errorMessage);
      }
    });
  }


  onLogout() {

   }

}
