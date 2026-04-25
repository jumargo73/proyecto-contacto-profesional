import { Component } from '@angular/core';

@Component({
  selector: 'app-public-navbar',
  standalone: false,
  templateUrl: './public-navbar.html',
  styleUrl: './public-navbar.css',
})
export class PublicNavbar {
  
  isMenuOpen = false;

}
