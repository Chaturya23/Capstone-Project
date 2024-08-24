import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductComponent {
  menuOpen = false;
  showForm = false;
  products: Product[] = [
    { name: 'Laptop', description: 'High performance laptop', price: 999, category: 'Electronics' },
    { name: 'Book', description: 'Educational book', price: 15, category: 'Books' },
    { name: 'T-Shirt', description: 'Cotton T-shirt', price: 20, category: 'Clothing' },
    { name: 'Watch', description: 'Wrist watch', price: 120, category: 'Accessories' }
  ];
  productName = '';
  productDescription = '';
  productPrice = 0;
  productCategory = '';
  categories = ['Electronics', 'Books', 'Clothing', 'Accessories'];

  constructor(private http: HttpClient) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    console.log('Menu open:', this.menuOpen); // Debugging output
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addProduct(form: NgForm) {
    if (form.valid) {
      const newProduct: Product = {
        name: this.productName,
        description: this.productDescription,
        price: this.productPrice,
        category: this.productCategory
      };

      // Send the product to the server to be stored in the database
      this.http.post<Product>('http://localhost:5000/api/products', newProduct).subscribe({
        next: (product) => {
          this.products.push(product); // Add the newly created product to the products array
          this.resetForm();
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
    }
  }

  resetForm() {
    this.productName = '';
    this.productDescription = '';
    this.productPrice = 0;
    this.productCategory = '';
    this.showForm = false;
  }
}
