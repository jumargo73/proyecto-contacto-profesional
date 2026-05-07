import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports:[RouterModule,ReactiveFormsModule, CommonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements OnInit {
  titulo: string = 'Bienvenido a nuestra plataforma';
  descripcion: string = 'Descubre soluciones increíbles para tus proyectos con Angular.';
  textoBoton: string = 'Empezar ahora';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef

  ) {}

  ngOnInit() {    
    }

  proyectos() {
    
    this.router.navigate(['/proyectos']);
    // Aquí podrías usar el Router para llevarlo a otra página
  }

  saber_mas(){
    this.router.navigate(['/saberMas']);
  }
  
}
