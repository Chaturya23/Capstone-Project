import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true,
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: any[] = [];
  loading = false;
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.errorMessage = null;
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    });
  }

  addToCart(product: any): void {
    // Store the product in localStorage or a service
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Optionally navigate to the cart page
    this.router.navigate(['/cart']);
  }
}
