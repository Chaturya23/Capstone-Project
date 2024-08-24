import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.services';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }
}
