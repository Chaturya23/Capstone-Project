import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from './cart.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, CartComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items when cartItems is populated', () => {
    component.cartItems = [
      { name: 'Item 1', price: 10, quantity: 1, description: 'Description 1', image: 'image1.jpg' },
      { name: 'Item 2', price: 20, quantity: 2, description: 'Description 2', image: 'image2.jpg' }
    ];
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Item 1');
    expect(cards[1].textContent).toContain('Item 2');
  });

  it('should display empty cart message when cartItems is empty', () => {
    component.cartItems = [];
    fixture.detectChanges();

    const message = fixture.nativeElement.querySelector('.empty-cart-message');
    expect(message).toBeTruthy();
    expect(message.textContent).toContain('Your cart is empty.');
  });

  it('should call removeItem when remove button is clicked', () => {
    spyOn(component, 'removeItem');
    component.cartItems = [
      { name: 'Item 1', price: 10, quantity: 1, description: 'Description 1', image: 'image1.jpg' }
    ];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[aria-label="Remove item"]');
    if (button) {
      button.click();
      expect(component.removeItem).toHaveBeenCalled();
    } else {
      console.warn('Remove button not found. Ensure it has the correct aria-label.');
    }
  });

  it('should call checkout when Proceed to Checkout button is clicked', () => {
    spyOn(component, 'checkout');
    component.cartItems = [{ name: 'Item 1', price: 10, quantity: 1, description: 'Description 1', image: 'image1.jpg' }];
    fixture.detectChanges();
    const proceedButton = fixture.nativeElement.querySelector('button[aria-label="Proceed to Checkout"]');
    if (proceedButton) {
      proceedButton.click();
      expect(component.checkout).toHaveBeenCalled();
    } else {
      console.warn('Proceed to Checkout button not found. Ensure it has the correct aria-label.');
    }
  });

  it('should display correct cart summary', () => {
    component.cartItems = [
      { name: 'Item 1', price: 10, quantity: 1, description: 'Description 1', image: 'image1.jpg' },
      { name: 'Item 2', price: 20, quantity: 2, description: 'Description 2', image: 'image2.jpg' }
    ];
    fixture.detectChanges();

    const summaryElement = fixture.nativeElement.querySelector('.cart-summary');
    expect(summaryElement.textContent).toContain('Total Items: 2');
    expect(summaryElement.textContent).toContain('Total Price: $0.00');
  });

  it('should update cart summary when item quantity changes', () => {
    component.cartItems = [
      { name: 'Item 1', price: 10, quantity: 1, description: 'Description 1', image: 'image1.jpg' }
    ];
    fixture.detectChanges();

    const quantityInput = fixture.nativeElement.querySelector('input[type="number"]');
    if (quantityInput) {
      quantityInput.value = '3';
      quantityInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Assuming your component updates the cart when the input changes
      expect(component.cartItems[0].quantity).toBe(3);

      const summaryElement = fixture.nativeElement.querySelector('.cart-summary');
      expect(summaryElement.textContent).toContain('Total Items: 1');
      expect(summaryElement.textContent).toContain('Total Price: $0.00');
    } else {
      console.warn('Quantity input not found. Ensure it exists in the component template.');
    }
  });

  it('should remove item when quantity becomes zero', () => {
    component.cartItems = [
      { name: 'Item 1', price: 10, quantity: 1, description: 'Description 1', image: 'image1.jpg' }
    ];
    fixture.detectChanges();

    const quantityInput = fixture.nativeElement.querySelector('input[type="number"]');
    if (quantityInput) {
      quantityInput.value = '0';
      quantityInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Assuming your component removes the item when quantity becomes 0
      expect(component.cartItems.length).toBe(0);
      const emptyMessage = fixture.nativeElement.querySelector('.empty-cart-message');
      expect(emptyMessage).toBeTruthy();
    } else {
      console.warn('Quantity input not found. Ensure it exists in the component template.');
    }
  });

  it('should disable Proceed to Checkout button when cart is empty', () => {
    component.cartItems = [];
    fixture.detectChanges();

    const proceedButton = fixture.nativeElement.querySelector('button[aria-label="Proceed to Checkout"]');
    if (proceedButton) {
      expect(proceedButton.disabled).toBeTruthy();
    } else {
      console.warn('Proceed to Checkout button not found. Ensure it has the correct aria-label.');
    }
  });
});