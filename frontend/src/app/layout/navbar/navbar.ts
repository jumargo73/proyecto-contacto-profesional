import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable,BehaviorSubject,tap } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  imports:[CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarHorizontalComponent implements OnInit {
  // Esto le dice a TypeScript: "Sí, esta propiedad existe en esta clase"
  public userName$!: Observable<string>;
  public isApiOk$!: Observable<string | null>;

 
 
  
  constructor(private authService: AuthService) {

    
  }
  
 
  
  ngOnInit() {
    this.userName$ = this.authService.userName$;
    this.isApiOk$!=this.authService.connection$;

      
    //console.log("Respuesta recibida desde authService redirect login a dashboard",this.userName$)
    //console.log("Respuesta recibida desde authService redirect login a dashboard",this.isApiOk$)
  }


  logout(){
    this.authService.logout();
  }
 

}
