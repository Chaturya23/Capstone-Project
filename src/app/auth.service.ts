import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Adjust API URL as needed
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false); // Added to track admin status

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Store token
          this.isLoggedInSubject.next(true); // Update login status
          this.checkIfAdmin(); // Check if the user is an admin
        }
      })
    );
  }

  checkIfAdmin(): void {
    // Example logic for checking if user is admin; adjust as needed
    const token = localStorage.getItem('token');
    if (token) {
      // Mock check; replace with actual API call
      this.isAdminSubject.next(true); // Assuming the user is an admin for this example
    } else {
      this.isAdminSubject.next(false);
    }
  }

  getAdminStatus(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token
    this.isLoggedInSubject.next(false); // Update login status
    this.isAdminSubject.next(false); // Reset admin status
  }
}
