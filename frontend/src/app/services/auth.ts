import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})


export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth/login'; 

  constructor(private http: HttpClient) {}  

  login(credentials: any) {
  return this.http.post(this.apiUrl, credentials);
}

}
