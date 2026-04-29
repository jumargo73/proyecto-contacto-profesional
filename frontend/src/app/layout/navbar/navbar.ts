import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable,BehaviorSubject,tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UiService } from '../../services/ui.service'


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarHorizontalComponent implements OnInit {
  // Esto le dice a TypeScript: "Sí, esta propiedad existe en esta clase"
  public userName$!: Observable<string>;
  public isApiOk$!: Observable<string | null>;
  public isMenuOpen = false;
  public isOpen$!: Observable<boolean>;
 
  
  constructor(private authService: AuthService,private uiService: UiService) {}
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Estado del menú:', this.isMenuOpen); 
    
  }


  toggleSidebar(){    
    this.uiService.toggleSidebar(); // Ahora esto controla al Sidebar   
    this.isOpen$ = this.uiService.sidebarOpen$
    console.log('Estado del menú sidebar en navbar,ts:', this.isOpen$!); 
  }
 
  
  ngOnInit() {
    this.userName$ = this.authService.userName$;
    this.isApiOk$=this.authService.connection$;
    this.isOpen$= this.uiService.sidebarOpen$
          
    //console.log("Respuesta recibida desde authService redirect login a dashboard",this.userName$)
    //console.log("Respuesta recibida desde authService redirect login a dashboard",this.isApiOk$)
  }


  logout(){
    this.authService.logout();
  }
 

}
