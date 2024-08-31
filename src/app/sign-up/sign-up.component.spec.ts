import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this module
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        HttpClientTestingModule, // Add this to imports
        SignUpComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the SignUpComponent', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when fields are empty', () => {
    expect(component.signUpFullName).toBeFalsy();
    expect(component.signUpEmail).toBeFalsy();
    expect(component.signUpPhone).toBeFalsy();
    expect(component.signUpPassword).toBeFalsy();
    expect(component.signUpConfirmPassword).toBeFalsy();
  });

  it('Full Name field should be required', () => {
    component.signUpFullName = '';
    fixture.detectChanges();
    const fullNameInput = fixture.nativeElement.querySelector('#signUpFullName');
    fullNameInput.value = '';
    fullNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const formElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));

    expect(fullNameInput.classList).toContain('ng-invalid');
  });

  it('Email field should be required and validate email format', () => {
    component.signUpEmail = 'invalid-email';
    fixture.detectChanges();
    const emailInput = fixture.nativeElement.querySelector('#signUpEmail');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(emailInput.classList).toContain('ng-invalid');
  });

  it('Phone number field should be valid with 10 digits', () => {
    const phoneInput = fixture.nativeElement.querySelector('#signUpPhone');
    phoneInput.value = '1234567890';
    phoneInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(phoneInput.classList).toContain('ng-valid');
  });

  it('Password and Confirm Password fields should match', () => {
    const passwordInput = fixture.nativeElement.querySelector('#signUpPassword');
    const confirmPasswordInput = fixture.nativeElement.querySelector('#signUpConfirmPassword');

    passwordInput.value = '123456';
    confirmPasswordInput.value = '654321';
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.signUpPassword).not.toEqual(component.signUpConfirmPassword);
  });

  it('should call signUp method on form submit if form is valid', () => {
    spyOn(component, 'signUp');

    // Simulating valid form input
    component.signUpFullName = 'Test User';
    component.signUpEmail = 'test@example.com';
    component.signUpPhone = '1234567890';
    component.signUpPassword = '123456';
    component.signUpConfirmPassword = '123456';

    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.signUp).toHaveBeenCalled();
  });
});
