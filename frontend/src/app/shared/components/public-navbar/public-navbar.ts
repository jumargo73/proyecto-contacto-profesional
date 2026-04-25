import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-public-navbar',
  standalone: false,
  templateUrl: './public-navbar.html',
  styleUrl: './public-navbar.css',
})
export class PublicNavbar {
  
  isMenuOpen = false;

  constructor(private router: Router) {
    // Escucha cada vez que cambias de página
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isMenuOpen = false; // Cierra el menú automáticamente
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
