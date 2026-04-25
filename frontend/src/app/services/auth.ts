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
  private connectionSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('access_token'));
  private userSubject = new BehaviorSubject<string>(localStorage.getItem('userName') || '');

  public userName$ = this.userSubject.asObservable();
  public connection$ = this.connectionSubject.asObservable();

  constructor(private http: HttpClient,private router: Router) {}  

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        // 1. Guardamos el estado del usuario en el Subject
        if (response && response.access_token) {
          console.log("Respuesta recibida desde backend",response)
          const name = response.user.name;
          const token = response.access_token;
          localStorage.setItem('access_token', token);
          localStorage.setItem('userName', name);

          //console.log("Respuesta recibida desde backend token", localStorage.getItem('access_token'))
          //console.log("Respuesta recibida desde backend user",localStorage.getItem('userName'))        
          

          this.userSubject.next(name); // El Navbar recibirá esto automáticamente
          this.connectionSubject.next(true) // El Navbar recibirá esto automáticamente
        }
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
    
    // 2. Si usas BehaviorSubject para el estado, actualízalo
    localStorage.clear();
    this.userSubject.next(''); // En lugar de null, envía un texto vacío
    this.connectionSubject.next(false);
    
    
    // 3. Redirigir al login
    this.router.navigate(['/login']);
  }

}
