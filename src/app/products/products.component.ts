import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string; 
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductComponent {
  menuOpen = false;
  showForm = false;
  products: Product[] = [
    { name: 'Laptop', description: 'High performance laptop', price: 999, category: 'Electronics',image: 'https://example.com/watch.jpg'  },
    { name: 'Book', description: 'Educational book', price: 15, category: 'Books' ,image: 'https://example.com/watch.jpg' },
    { name: 'T-Shirt', description: 'Cotton T-shirt', price: 20, category: 'Clothing',image: 'https://example.com/watch.jpg'  },
    { name: 'Watch', description: 'Wrist watch', price: 120, category: 'Accessories',image: '/assets/im.png'  }
  ];
  productName = '';
  productDescription = '';
  productPrice = 0;
  productCategory = '';
  categories = ['Electronics', 'Books', 'Clothing', 'Accessories'];

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
      this.products.push({
        name: this.productName,
        description: this.productDescription,
        price: this.productPrice,
        category: this.productCategory
      });
      this.resetForm();
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