import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');

    //console.log("Este es el Tocken recibido desde Backen en AUTHGuard",token)

    if (token) {
      // Si hay token, permitimos el paso
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      // Si no hay token, lo mandamos al login y bloqueamos      
      return true;
    }
  }
}