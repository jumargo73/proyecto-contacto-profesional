import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject,tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router,RouterModule } from '@angular/router';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})


export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth/login`; 

  // 1. Creamos el emisor de estados
  private userSubject = new BehaviorSubject<any>(null);
  private connectionSubject = new BehaviorSubject<boolean>(false);
  public userName$ = this.userSubject.asObservable();
  public connection$ = this.connectionSubject.asObservable();

  constructor(private http: HttpClient,private router: Router) {}  

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        // 1. Guardamos el estado del usuario en el Subject
        if (response && response.user) {
          console.log("Respuesta recibida desde services auth Frontend",response)
          const name = response.user.name;
          localStorage.setItem('userName', name);
          this.userSubject.next(name); // El Navbar recibirá esto automáticamente
        }
        
        // 2. Notificamos que la conexión fue exitosa
        this.connectionSubject.next(true);
      }),
      // 3. Capturamos errores para actualizar el estado de conexión
      catchError(error => {
        this.connectionSubject.next(false); // La API falló
        throw error; // Relanzamos el error para que el login.ts sepa que algo salió mal
      })
    );
  }

  private apiUrlRegister = `${environment.apiUrl}/auth/register`;

  register(credentials: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, credentials);
  }

  logout(): void {
    // 1. Eliminar token del almacenamiento
    localStorage.removeItem('auth_token'); // O sessionStorage
    
    // 2. Si usas BehaviorSubject para el estado, actualízalo
    this.userSubject.next(null);
    this.connectionSubject.next(false); // O el estado que corresponda
    
    // 3. Redirigir al login
    this.router.navigate(['/login']);
  }

}
