import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  // Cambia la URL si tu NestJS corre en otro puerto
  private apiUrl = `${environment.apiUrl}/contacts`; 

  constructor(private http: HttpClient) { }

  // Ejemplo para obtener todos los contactos
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Este es el método que enviará el JSON a Prisma
  enviarContacto(datos: any): Observable<any> {
    return this.http.post(this.apiUrl, datos);
  }

}

