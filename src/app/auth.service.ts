import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  signUp(fullName: string, email: string, phone: string, password: string): Observable<any> {
    const payload = { fullName, email, phone, password };
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  signIn(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }
}

