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
      imports: [MatCardModule, MatButtonModule, CartComponent], // Import CartComponent here
      schemas: [NO_ERRORS_SCHEMA] // To ignore unknown elements like mat-card
    })
    .compileComponents();

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
    expect(cards[0].querySelector('mat-card-title').textContent).toContain('Item 1');
    expect(cards[1].querySelector('mat-card-title').textContent).toContain('Item 2');
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
  
    const button = fixture.nativeElement.querySelector('button.mat-raised-button');
    console.log(button); // Check if button is null or exists
    if (button) {
      button.click();
      expect(component.removeItem).toHaveBeenCalled();
    } else {
      fail('Remove button not found');
    }
  });
  

  it('should call checkout when Proceed to Checkout button is clicked', () => {
    spyOn(component, 'checkout');
    fixture.detectChanges();
    const proceedButton = fixture.nativeElement.querySelector('button.proceed-to-checkout'); // Adjust the selector as needed
    if (proceedButton) {
      proceedButton.click();
      fixture.detectChanges();
      expect(component.checkout).toHaveBeenCalled();
    } else {
      fail('Proceed to Checkout button not found');
    }
  });
  

  it('should display correct cart summary', () => {
    component.cartItems = [
      { name: 'Item 1', price: 10, quantity: 1, description: 'Description 1', image: 'image1.jpg' },
      { name: 'Item 2', price: 20, quantity: 2, description: 'Description 2', image: 'image2.jpg' }
    ];
    component.totalPrice = 50; // Assuming totalPrice is calculated elsewhere
    fixture.detectChanges();

    const totalItems = fixture.nativeElement.querySelector('.cart-summary p:nth-child(2)');
    const totalPrice = fixture.nativeElement.querySelector('.cart-summary p:nth-child(3)');

    expect(totalItems.textContent).toContain('Total Items: 2');
    expect(totalPrice.textContent).toContain('Total Price: $50.00');
  });
});
