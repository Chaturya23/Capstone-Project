import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true,
  styleUrls: ['./products.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {};
  editingProduct: any = null;
  showForm: string | null = null;
  categories: string[] = ['Electronics', 'Books', 'Clothing', 'Accessories'];
  loading = false;
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.products = [
      { name: 'Laptop', description: 'A high-performance laptop', price: 999, category: 'Electronics', image: '/assets/im1.png' },
      { name: 'Book', description: 'A thrilling novel', price: 15, category: 'Books', image: '/assets/s1.png' },
      { name: 'T-Shirt', description: 'A comfortable t-shirt', price: 20, category: 'Clothing', image: '/assets/t1.png' },
      { name: 'Watch', description: 'A stylish watch', price: 120, category: 'Accessories', image: '/assets/hd1.png' },
      
    ];
  }
    // this.getProducts();
  // }

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

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price) {
      this.http.post(this.apiUrl, this.newProduct).subscribe({
        next: () => {
          this.getProducts();
          this.toggleForm(); // Close form after adding product
        },
        error: (error) => {
          this.errorMessage = 'Failed to add product. Please try again later.';
        }
      });
    }
  }

  startEditing(product: any): void {
    this.editingProduct = { ...product }; // Create a copy to edit
    console.log('Editing Product:', this.editingProduct); // Debugging
  }

  updateProduct(): void {
    if (this.editingProduct) {
      this.http.put(`${this.apiUrl}/${this.editingProduct._id}`, this.editingProduct).subscribe({
        next: () => {
          this.getProducts();
          this.editingProduct = null; // Close form after updating product
        },
        error: (error) => {
          this.errorMessage = 'Failed to update product. Please try again later.';
        }
      });
    }
  }

  cancelEditing(): void {
    this.editingProduct = null; // Close form
  }

  confirmDelete(product: any): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct(product);
    }
  }

  deleteProduct(product: any): void {
    this.http.delete(`${this.apiUrl}/${product._id}`).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete product. Please try again later.';
      }
    });
  }

  toggleMenu() {
    // Add your logic to toggle the menu here
    console.log('Menu toggled');
  }

  showAddForm(): void {
    this.showForm = 'add';
    this.newProduct = {}; // Reset new product form
  }

  toggleForm(): void {
    this.showForm = null;
  }
}
