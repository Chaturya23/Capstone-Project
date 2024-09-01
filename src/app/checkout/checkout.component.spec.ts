import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CheckoutComponent } from './checkout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        CheckoutComponent // Import the standalone component here
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
    spyOn(component, 'processPayment');
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.processPayment).toHaveBeenCalled();
  });

  it('should initialize with default values', () => {
    expect(component.selectedPaymentMethod).toBe('card');
  });

  it('should update selectedPaymentMethod when payment method is changed', () => {
    component.selectedPaymentMethod = 'card'; // Set initial value for testing
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    select.value = 'paypal';
    select.dispatchEvent(new Event('selectionChange', { bubbles: true }));
    fixture.detectChanges();
    expect(component.selectedPaymentMethod).toBe('paypal');
  });

  it('should clear cart after successful payment', () => {
    component.cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 1, image: '', description: '' }];
    component.processPayment();
    expect(component.cartItems.length).toBe(0);
  });

  it('should have a valid initial state', () => {
    expect(component.cartItems).toBeDefined();
    expect(component.selectedPaymentMethod).toBeDefined();
    expect(typeof component.processPayment).toBe('function');
  });

  it('should display correct number of items in the cart', () => {
    component.cartItems = [
      { id: 1, name: 'Item 1', price: 10, quantity: 1, image: '', description: '' },
      { id: 2, name: 'Item 2', price: 20, quantity: 2, image: '', description: '' }
    ];
    fixture.detectChanges();
    const itemElements = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(itemElements.length).toBe(2);
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
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton).toBeTruthy();
  });
});
