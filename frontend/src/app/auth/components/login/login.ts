import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements  OnInit {

  loginForm: FormGroup;
  enviando = false;
 
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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
    if (this.loginForm.valid) {
      this.enviando = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (respuesta) => {
          
          this.enviando = false;
          alert(`authentication ok`);
          
          this.loginForm.reset();
                },
        error: (err) => console.error(err)
      });
    }
  }

}
