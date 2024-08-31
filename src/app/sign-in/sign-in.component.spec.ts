import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { SignInComponent } from './sign-in.component';
import { AuthService } from '../auth.service'; // Make sure to import your AuthService

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        HttpClientTestingModule, // Add HttpClientTestingModule here
        SignInComponent
      ],
      providers: [
        AuthService // Provide the AuthService if it’s required by the component
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    component.signInEmail = '';
    component.signInPassword = '';
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    const emailInput = fixture.nativeElement.querySelector('#signInEmail');
    const passwordInput = fixture.nativeElement.querySelector('#signInPassword');

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(form.checkValidity()).toBeFalse();
  });
});
