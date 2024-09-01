import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    const authServiceMock = {
      getAdminStatus: jasmine.createSpy('getAdminStatus').and.returnValue(of(true))
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
    authService = TestBed.inject(AuthService);
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
      expect(router.navigate).toHaveBeenCalledWith(['/home']); // Adjust to match the actual redirect path
    });
  });

  it('should handle error from getAdminStatus', (done) => {
    const errorMessage = 'Error occurred';
    (authService.getAdminStatus as jasmine.Spy).and.returnValue(throwError(() => new Error(errorMessage)));
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;
  
    guard.canActivate(route, state).subscribe({
      next: result => {
        expect(result).toBeFalse(); // Ensure that an error results in access being denied
        expect(router.navigate).toHaveBeenCalledWith(['/home']); // Adjust to match the actual redirect path
        done(); // Notify Jasmine that the asynchronous test is complete
      },
      error: err => {
        fail(`Expected result, but got error: ${err}`); // Ensure the test fails if an unexpected error occurs
        done(); // Ensure done is called even if the test fails
      }
    });
  });

  it('should handle getAdminStatus emitting multiple values', (done) => {
    const status$ = of(true, false); // Emits admin status values sequentially
    (authService.getAdminStatus as jasmine.Spy).and.returnValue(status$);
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    let callCount = 0;

    guard.canActivate(route, state).subscribe(result => {
      callCount++;
      if (callCount === 1) {
        expect(result).toBeTrue(); // First emission should be true
      } else if (callCount === 2) {
        expect(result).toBeFalse(); // Second emission should be false
        expect(router.navigate).toHaveBeenCalledWith(['/home']); // Adjust to match the actual redirect path
        done(); // Notify Jasmine that the asynchronous test is complete
      }
    });
  });

  it('should handle invalid route and state parameters gracefully', () => {
    (authService.getAdminStatus as jasmine.Spy).and.returnValue(of(true));
    const invalidRoute: ActivatedRouteSnapshot = {} as any; // You can customize this if needed
    const invalidState: RouterStateSnapshot = {} as any; // You can customize this if needed

    guard.canActivate(invalidRoute, invalidState).subscribe(result => {
      expect(result).toBeTrue(); // Ensure the guard still allows access
    });
  });

});
