import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports:[CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements  OnInit {

  loginForm: FormGroup;
  enviando = false;
  errorMessage=""
  isApiOk=false
 
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

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
        console.log("Respuesta recibida desde authService frontend",response)
        // Solo nos preocupamos por la navegación
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error de login', err);
      }
    });
  }


  onLogout() {

   }

}
