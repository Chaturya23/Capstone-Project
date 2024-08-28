import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  private readonly correctUsername = 'admin';
  private readonly correctPassword = 'password123';

  constructor(private router: Router) {}

  login() {
    if (this.username === this.correctUsername && this.password === this.correctPassword) {
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/products']); // Redirect to the products page
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }

}
