import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it('should return admin status for admin credentials', (done) => {
      service.signIn('admin@gmail.com', 'adminpass').subscribe(response => {
        expect(response.isAdmin).toBe(true);
        done();
      });
    });

    it('should return user status for regular user credentials', () => {
      const mockResponse = { isAdmin: false };
      service.signIn('user@example.com', 'userpass').subscribe(response => {
        expect(response.isAdmin).toBe(false);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/users/signin');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle sign in error', () => {
      service.signIn('user@example.com', 'wrongpassword').subscribe({
        next: () => fail('expected an error, not user data'),
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne('http://localhost:3000/api/users/signin');
      expect(req.request.method).toBe('POST');
      req.flush('Sign in error', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('getAdminStatus', () => {
    it('should return admin status as an observable', (done) => {
      service.getAdminStatus().subscribe(status => {
        expect(status).toBe(false);
        done();
      });
    });
  });

  describe('getLoginStatus', () => {
    it('should return login status as an observable', (done) => {
      service.getLoginStatus().subscribe(status => {
        expect(status).toBe(false);
        done();
      });
    });
  });

  describe('signUp', () => {
    it('should successfully sign up a new user', () => {
      const mockResponse = { success: true };
      service.signUp('John Doe', 'john@example.com', '1234567890', 'password').subscribe(response => {
        expect(response.success).toBe(true);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/users/signup');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle sign up error', () => {
      service.signUp('John Doe', 'john@example.com', '1234567890', 'password').subscribe({
        next: () => fail('expected an error, not success response'),
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne('http://localhost:3000/api/users/signup');
      expect(req.request.method).toBe('POST');
      req.flush('Sign up error', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('logout', () => {
    it('should reset admin and login status', (done) => {
      service.logout().subscribe(() => {
        service.getAdminStatus().subscribe(status => {
          expect(status).toBe(false);
        });
        service.getLoginStatus().subscribe(status => {
          expect(status).toBe(false);
          done();
        });
      });
    });
  });
});
