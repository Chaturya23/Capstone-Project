import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule]
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  paymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '' // Added UPI ID field
  };
  shippingDetails = {
    name: '',
    address: '',
    phone: ''
  };
  selectedPaymentMethod: string = 'card'; // Default payment method
  paymentSuccess: boolean = false;

  private cartKey = 'cartItems';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  loadCartItems(): void {
    const items = localStorage.getItem(this.cartKey);
    this.cartItems = items ? JSON.parse(items) : [];
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  processPayment(): void {
    // Check for required fields based on selected payment method
    if (this.selectedPaymentMethod === 'card') {
      if (!this.paymentDetails.cardNumber || !this.paymentDetails.expiryDate || !this.paymentDetails.cvv) {
        alert('Please fill in all card details.');
        return;
      }
    } else if (this.selectedPaymentMethod === 'online') {
      if (!this.paymentDetails.upiId) {
        alert('Please provide your UPI ID.');
        return;
      }
    }

    // Here you would normally process the payment with a payment gateway
    // For now, we'll just simulate payment processing

    // Clear the cart
    localStorage.removeItem(this.cartKey);
    this.cartItems = [];
    this.totalPrice = 0;

    // Show success message
    this.paymentSuccess = true;

    // Optionally, reset the form or hide the payment section
    this.shippingDetails = { name: '', address: '', phone: '' };
    this.paymentDetails = { cardNumber: '', expiryDate: '', cvv: '', upiId: '' }; // Reset all payment details
    this.selectedPaymentMethod = 'card'; // Reset payment method to default
  }
}
