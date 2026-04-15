import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: false,
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  titulo: string = 'Bienvenido a nuestra plataforma';
  descripcion: string = 'Descubre soluciones increíbles para tus proyectos con Angular.';
  textoBoton: string = 'Empezar ahora';

  accionBoton() {
    console.log('El usuario hizo clic en el banner');
    // Aquí podrías usar el Router para llevarlo a otra página
  }
}
