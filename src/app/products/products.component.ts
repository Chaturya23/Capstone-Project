import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

export interface Product {
  name: string;
  price: number;
  image?: string; 
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
    { name: 'Laptop', price: 999, image: 'assets/im1.png' },
    { name: 'Book', price: 15, image: 'assets/s1.png' },
    { name: 'T-Shirt', price: 20, image: 'assets/t1.png' },
    { name: 'Watch', price: 120, image: 'assets/hd1.png' },
    { name: 'Laptop', price: 999, image: 'assets/im1.png' },
    { name: 'Book', price: 15, image: 'assets/s1.png' },
    { name: 'T-Shirt', price: 20, image: 'assets/t1.png' },
    { name: 'Watch', price: 120, image: 'assets/hd1.png' }
  ];
  productName = '';
  productDescription = '';
  productPrice = 0;
  productCategory = '';
  productImage = ''; // Add this line to handle image URL
  categories = ['Chairs', 'Sofa', 'Table', 'Home Decor'];

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
        price: this.productPrice,
        image: this.productImage
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.productName = '';
    this.productDescription = '';
    this.productPrice = 0;
    this.productCategory = '';
    this.productImage = ''; // Clear the image URL
    this.showForm = false;
  }
}
