import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!loggedIn) {
      this.router.navigate(['/login']); // Redirect to the login page if not logged in
      return false;
    }
    return true;
  }
}

