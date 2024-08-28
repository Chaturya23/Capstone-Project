import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Your Express server URL

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { email, password });
  }

  signUp(fullName: string, email: string, phone: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { fullName, email, phone, password });
  }
}
