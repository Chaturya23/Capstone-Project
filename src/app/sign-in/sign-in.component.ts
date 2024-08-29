import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SignInComponent {
  signInEmail: string = '';
  signInPassword: string = '';

  private apiUrl = 'http://localhost:3000/api/users'; // Correct API URL

  constructor(private http: HttpClient, private router: Router) {}

  signIn(): void {
    this.http.post<any>(`${this.apiUrl}/signin`, {
      email: this.signInEmail,
      password: this.signInPassword
    }).subscribe(
      response => {
        console.log('Sign In Successful', response);
        this.router.navigate(['/shop']);
      },
      error => {
        console.error('Sign In Failed', error);
        alert('Invalid credentials');
      }
    );
  }
}
