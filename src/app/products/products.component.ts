import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Product {
  name: string;
  price: number;
  image?: string; 
  description?: string;
  category?: string;
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
  dropdownOpen = false;
  showForm: 'add' | 'edit' | 'delete' | null = null;
  products: any[] = [];
  categories = ['Chairs', 'Sofas', 'Tables', 'Home Decor'];
  productName = '';
  productDescription = '';
  productPrice = 0;
  productCategory = '';
  productImage = '';
  selectedProduct: any = null;
  selectedProductToDelete: any = null;
  constructor(private router: Router) {}

  ngOnInit() {
    // Initial data or fetch products from a service
    this.products = [
      { name: 'Chair', description: 'A high-performance laptop', price: 999, category: 'Chairs', image: '/assets/im1.png' },
      { name: 'Sofa', description: 'A thrilling novel', price: 15, category: 'Sofas', image: '/assets/s1.png' },
      { name: 'Table', description: 'A comfortable t-shirt', price: 20, category: 'Table', image: '/assets/t1.png' },
      { name: 'Home decor', description: 'A stylish watch', price: 120, category: 'Home Decor', image: '/assets/hd1.png' },
      { name: 'Chair', description: 'A high-performance laptop', price: 999, category: 'Chairs', image: '/assets/im7.png' },
      { name: 'Sofa', description: 'A thrilling novel', price: 15, category: 'Sofas', image: '/assets/s6.png' },
      { name: 'Home Decor', description: 'A comfortable t-shirt', price: 20, category: 'Home Decor', image: '/assets/hd7.png' },
      { name: 'Home Decor', description: 'A stylish watch', price: 120, category: 'Home Decor', image: '/assets/hd6.png' }
    ];
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  showAddForm() {
    this.showForm = 'add';
    this.dropdownOpen = false;
  }

  showEditForm() {
    this.showForm = 'edit';
    this.dropdownOpen = false;
  }

  showDeleteForm() {
    this.showForm = 'delete';
    this.dropdownOpen = false;
  }

  toggleForm() {
    this.showForm = null;
    this.resetForm();
  }

  addProduct(form: NgForm) {
    if (form.valid) {
      this.products.push({
        name: this.productName,
        description: this.productDescription,
        price: this.productPrice,
        category: this.productCategory,
        image: this.productImage
      });
      this.toggleForm();
    }
  }

  editProduct(form: NgForm) {
    if (form.valid && this.selectedProduct) {
      const index = this.products.findIndex(p => p === this.selectedProduct);
      if (index !== -1) {
        this.products[index] = {
          name: this.productName,
          description: this.productDescription,
          price: this.productPrice,
          category: this.productCategory,
          image: this.productImage
        };
      }
      this.toggleForm();
    }
  }

  deleteProduct(form: NgForm) {
    if (form.valid && this.selectedProductToDelete) {
      this.products = this.products.filter(product => product !== this.selectedProductToDelete);
      this.toggleForm();
    }
  }

  resetForm() {
    this.productName = '';
    this.productDescription = '';
    this.productPrice = 0;
    this.productCategory = '';
    this.productImage = '';
    this.selectedProduct = null;
    this.selectedProductToDelete = null;
  }
  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}
