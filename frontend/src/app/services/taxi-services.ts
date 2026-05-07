import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaxiServices {

    private apiUrl = `${environment.apiUrl}/taxi`; 

    constructor(private http: HttpClient) { }

    // Ejemplo para obtener todos los contactos
    getTaxi_Services(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
  
    getTaxi_Service(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }

    solicitar_taxi(datos: any): Observable<any>{
       return this.http.post(this.apiUrl, datos);
    }
}
