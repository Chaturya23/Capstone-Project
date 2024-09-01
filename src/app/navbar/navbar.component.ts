import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentView: string = '';
  isAdmin: boolean = false; // Ensure this is declared
  isLoggedIn: boolean = false; // Track login status

  signInEmail: string = '';
  signInPassword: string = '';

  signUpFullName: string = '';
  signUpEmail: string = '';
  signUpPhone: string = '';
  signUpPassword: string = '';
  signUpConfirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Subscribe to admin status observable
    this.authService.getAdminStatus().subscribe(status => {
      this.isAdmin = status;
    });

    // Subscribe to login status observable (you might need to add this method to AuthService)
    this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  showForm(view: string): void {
    this.currentView = view;
  }

  signIn() {
    this.authService.signIn(this.signInEmail, this.signInPassword).subscribe(
      response => {
        this.isLoggedIn = true; // Update login status
        console.log('Sign-In successful:', response);
      },
      error => {
        console.error('Sign-In Error:', error);
        this.isLoggedIn = false; // Update login status
      }
    );
  }

  signUp() {
    if (this.signUpPassword === this.signUpConfirmPassword) {
      this.authService.signUp(this.signUpFullName, this.signUpEmail, this.signUpPhone, this.signUpPassword).subscribe(
        response => {
          console.log('Sign-Up successful:', response);
        },
        error => {
          console.error('Sign-Up Error:', error);
        }
      );
    } else {
      console.error('Passwords do not match');
    }
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.router.navigate(['/home']); // Redirect to the home page
        console.log('Logged out successfully');
      },
      error => {
        console.error('Logout Error:', error);
      }
    );
  }
}
