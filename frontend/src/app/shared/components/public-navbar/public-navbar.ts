import { Component } from '@angular/core';
export class NavbarComponent {
  isMenuOpen = false; // Controla si el menú se ve o no
}

@Component({
  selector: 'app-public-navbar',
  standalone: false,
  templateUrl: './public-navbar.html',
  styleUrl: './public-navbar.css',
})
export class PublicNavbar {}
