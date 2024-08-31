import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Make sure to import AuthService

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let router: Router;
  let authService: AuthService; // Add a variable for AuthService

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    const authServiceMock = {
      getAdminStatus: jasmine.createSpy('getAdminStatus').and.returnValue(of(true)) // Mock implementation
    };

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService); // Inject AuthService to use in tests
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is an admin', () => {
    (authService.getAdminStatus as jasmine.Spy).and.returnValue(of(true));
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    guard.canActivate(route, state).subscribe(result => {
      expect(result).toBeTrue();
    });
  });

  it('should prevent access if user is not an admin', () => {
    (authService.getAdminStatus as jasmine.Spy).and.returnValue(of(false));
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    guard.canActivate(route, state).subscribe(result => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/not-authorized']); // Adjust if necessary
    });
  });

});
