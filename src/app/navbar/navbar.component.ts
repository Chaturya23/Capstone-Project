import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports :[RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentView: string = '';
  isAdmin$: Observable<boolean>; // Make it observable

  signInEmail: string = '';
  signInPassword: string = '';

  signUpFullName: string = '';
  signUpEmail: string = '';
  signUpPhone: string = '';
  signUpPassword: string = '';
  signUpConfirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.isAdmin$ = this.authService.getAdminStatus(); // Initialize here
  }

  ngOnInit() {
    // This can remain empty if initialization is done in the constructor
  }

  showForm(view: string): void {
    this.currentView = view;
  }

  signIn(): void {
    this.authService.signIn(this.signInEmail, this.signInPassword).subscribe(
      response => {
        console.log('Sign-In Successful', response);
        this.router.navigate(['/shop']);
      },
      error => {
        console.error('Sign-In Failed', error);
        alert('Invalid credentials');
      }
    );
  }

  signUp(): void {
    if (this.signUpPassword === this.signUpConfirmPassword) {
      // Replace with correct sign-up logic if available
      console.error('Sign-Up logic is not implemented');
    } else {
      console.error('Passwords do not match');
    }
  }
}
