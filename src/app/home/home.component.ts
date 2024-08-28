import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule]
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  menuOpen = false;
  currentView: string = 'home';
  signInEmail: string = '';
  signInPassword: string = '';
  signUpFullName: string = '';
  signUpEmail: string = '';
  signUpPhone: string = '';
  signUpPassword: string = '';
  signUpConfirmPassword: string = '';

  showForm(formType: string): void {
    this.currentView = formType;
  }

  signIn(): void {
    this.authService.signIn(this.signInEmail, this.signInPassword).subscribe(
      response => {
        console.log('Sign In Successful', response);
        // Navigate to the products page after successful sign-in
        this.router.navigate(['/shop']);
      },
      error => {
        console.error('Sign In Failed', error);
        alert('Invalid credentials');
      }
    );
  }

  signUp(): void {
    if (this.signUpPassword !== this.signUpConfirmPassword) {
        alert('Passwords do not match');
        return;
    }

    this.authService.signUp(this.signUpFullName, this.signUpEmail, this.signUpPhone, this.signUpPassword).subscribe(
        response => {
            console.log('Sign Up Successful', response);
            alert('Registration successful! Please sign in.');
            this.currentView = 'signIn'; // Navigate to the Sign In page
        },
        error => {
            console.error('Sign Up Failed', error);
            alert('Registration failed');
        }
    );
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.menuOpen && !target.closest('.side-menu') && !target.closest('.hamburger')) {
      this.closeMenu();
    }
  }

  navigateTo(page: string): void {
    console.log('Navigate to:', page);
  }
}
