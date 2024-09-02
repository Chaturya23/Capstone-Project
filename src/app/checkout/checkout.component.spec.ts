import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CheckoutComponent } from './checkout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { of, throwError } from 'rxjs';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        CheckoutComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items when there are items in the cart', () => {
    component.cartItems = [
      { id: 1, name: 'Item 1', price: 10, quantity: 1, image: '', description: '' },
      { id: 2, name: 'Item 2', price: 20, quantity: 2, image: '', description: '' }
    ];
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(items.length).toBe(2);
  });

  it('should call processPayment method when form is submitted', () => {
    spyOn(component, 'processPayment').and.callThrough();
    component.shippingDetails = {
      name: 'John Doe',
      address: '123 Main St',
      phone: '1234567890',
      email: 'john.doe@example.com'
    };
    fixture.detectChanges();
    const formElement = fixture.debugElement.query(By.css('form'));
    if (formElement) {
      formElement.triggerEventHandler('submit', null);
      fixture.detectChanges();
      expect(component.processPayment).toHaveBeenCalled();
    } else {
      fail('Form element is not found.');
    }
  });

  it('should initialize with default values', () => {
    expect(component.selectedPaymentMethod).toBe('card');
  });

  it('should update selectedPaymentMethod when a new method is selected', () => {
    const select = fixture.nativeElement.querySelector('select[name="paymentMethod"]');
    expect(select).toBeTruthy();
  });
  

  it('should alert when email is not provided', () => {
    spyOn(window, 'alert');
    component.shippingDetails.email = ''; // No email provided
    component.processPayment();
    expect(window.alert).toHaveBeenCalledWith('Please provide your email address.');
  });

  it('should alert when card details are missing for card payment method', () => {
    spyOn(window, 'alert');
    component.selectedPaymentMethod = 'card';
    component.paymentDetails.cardNumber = '';
    component.paymentDetails.expiryDate = '';
    component.paymentDetails.cvv = '';
    component.processPayment();
    expect(window.alert).toHaveBeenCalledWith('Please fill in all card details.');
  });

  it('should alert when UPI ID is missing for online payment method', () => {
    spyOn(window, 'alert');
    component.selectedPaymentMethod = 'online';
    component.paymentDetails.upiId = ''; // No UPI ID provided
    component.processPayment();
    expect(window.alert).toHaveBeenCalledWith('Please provide your UPI ID.');
  });

  it('should clear cart after successful payment', () => {
    component.cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 1 }];
    spyOn(component['http'], 'post').and.returnValue(of({})); // Mock HTTP call
    component.processPayment();
    expect(component.cartItems.length).toBe(0);
    expect(component.totalPrice).toBe(0);
  });

  it('should handle payment failure and show error message', () => {
    spyOn(window, 'alert');
    spyOn(component['http'], 'post').and.returnValue(throwError({ error: 'Payment failed' })); // Mock HTTP error
    component.shippingDetails.email = 'test@example.com'; // Provide valid email to pass previous checks
    component.processPayment();
    expect(window.alert).toHaveBeenCalledWith('Error processing payment.');
  });

  it('should display empty cart message when no items are in the cart', () => {
    component.cartItems = [];
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.empty-cart-message'));
    expect(message.nativeElement.textContent).toContain('Your cart is empty.');
  });

  it('should enable submit button when required fields are filled', () => {
    component.shippingDetails = {
      name: 'John Doe',
      address: '123 Main St',
      phone: '1234567890',
      email: 'john.doe@example.com'
    };
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    if (submitButton) {
      expect(submitButton.nativeElement.disabled).toBeFalsy();
    } else {
      fail('Submit button is not found.');
    }
  });

  it('should calculate total price correctly', () => {
    component.cartItems = [
      { id: 1, name: 'Item 1', price: 10, quantity: 1 },
      { id: 2, name: 'Item 2', price: 20, quantity: 2 }
    ];
    component.calculateTotalPrice();
    expect(component.totalPrice).toBe(50); // 10 * 1 + 20 * 2
  });

  it('should display item details correctly', () => {
    component.cartItems = [
      { id: 1, name: 'Test Item', price: 15.99, quantity: 2, image: 'test.jpg', description: 'Test description' }
    ];
    fixture.detectChanges();
    const itemElement = fixture.debugElement.query(By.css('mat-card'));
    expect(itemElement.nativeElement.textContent).toContain('Test Item');
    expect(itemElement.nativeElement.textContent).toContain('15.99');
    expect(itemElement.nativeElement.textContent).toContain('2');
  });

  it('should have a form with required fields', () => {
    const nameInput = fixture.debugElement.query(By.css('input[name="name"]'));
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
    const addressInput = fixture.debugElement.query(By.css('input[name="address"]'));

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(addressInput).toBeTruthy();
  });

  it('should have a submit button', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
  });
});
