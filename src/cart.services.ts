import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += 1;  // Increment quantity if product already exists
    } else {
      product.quantity = 1;  // Set initial quantity if product is added for the first time
      this.cartItems.push(product);
    }

    this.cartItemsSubject.next(this.cartItems);
  }
}
