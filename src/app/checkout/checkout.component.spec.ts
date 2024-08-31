import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CheckoutComponent } from './checkout.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { FormsModule } from '@angular/forms';
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
        BrowserAnimationsModule, // Ensure animations module is imported
        HttpClientTestingModule, // Import HttpClientTestingModule
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        CheckoutComponent // Import the standalone component
      ],
      schemas: [NO_ERRORS_SCHEMA] // To ignore unknown elements in templates
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display cart items when there are items in the cart', () => {
    component.cartItems = [{ id: 1, name: 'Item 1', price: 10, quantity: 1, image: '', description: '' }, { id: 2, name: 'Item 2', price: 20, quantity: 2, image: '', description: '' }];
    fixture.detectChanges(); // Trigger change detection
    const items = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(items.length).toBeGreaterThan(0); // Ensure items are displayed
  });

  it('should call processPayment method when form is submitted', () => {
    spyOn(component, 'processPayment'); // Spy on processPayment method
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    expect(formElement).not.toBeNull(); // Ensure form element exists
    formElement.dispatchEvent(new Event('submit')); // Simulate form submission
    fixture.detectChanges(); // Trigger change detection
    expect(component.processPayment).toHaveBeenCalled(); // Verify method call
  });

  it('should initialize with default values', () => {
    expect(component.selectedPaymentMethod).toBe('card'); // Adjust based on actual default value
  });

});
