import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Updated endpoint
  private adminCredentials = {
    email: 'admin@gmail.com',
    password: 'adminpass'
  };

  private adminStatus = new BehaviorSubject<boolean>(false); // Holds the admin status
  private loginStatus = new BehaviorSubject<boolean>(false); // Holds the login status

  constructor(private http: HttpClient) {}

  // Method to sign in and check if the user is an admin
  signIn(email: string, password: string): Observable<any> {
    // Admin check
    if (email === this.adminCredentials.email && password === this.adminCredentials.password) {
      this.adminStatus.next(true); // Set admin status to true
      this.loginStatus.next(true); // Set login status to true
      return new Observable(observer => {
        observer.next({ isAdmin: true });
        observer.complete();
      });
    }

    // Regular user check
    return this.http.post<any>(`${this.apiUrl}/signin`, { email, password }).pipe(
      tap(response => {
        // Update admin status based on response
        this.adminStatus.next(response.isAdmin || false);
        this.loginStatus.next(true); // Set login status to true
      }),
      catchError(error => {
        // Handle error, e.g., log it or notify the user
        console.error('Sign In Error:', error);
        this.loginStatus.next(false); // Set login status to false
        throw error; // Rethrow error to be handled by subscriber
      })
    );
  }

  // Method to get the current admin status as an observable
  getAdminStatus(): Observable<boolean> {
    return this.adminStatus.asObservable();
  }

  // Method to get the current login status as an observable
  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  // Method to sign up a new user
  signUp(fullName: string, email: string, phone: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { fullName, email, phone, password }).pipe(
      catchError(error => {
        // Handle error, e.g., log it or notify the user
        console.error('Sign Up Error:', error);
        throw error; // Rethrow error to be handled by subscriber
      })
    );
  }

  // Method to logout the user
  logout(): Observable<any> {
    // Implement actual logout logic here if needed
    this.adminStatus.next(false); // Reset admin status
    this.loginStatus.next(false); // Reset login status
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }
}
