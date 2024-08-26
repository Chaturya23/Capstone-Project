// import { Component, HostListener } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-shop',
//   standalone: true,
//   templateUrl: './shop.component.html',
//   styleUrls: ['./shop.component.css'],
//   imports: [
//     MatCardModule,
//     MatToolbarModule,
//     MatFormFieldModule,
//     MatSelectModule,
//     MatIconModule,
//     CommonModule,
//     RouterModule
//   ]
// })
// export class ShopComponent {
//   menuOpen = false;

//   products = [
//     { name: 'Chair 1', price: 29.99, imageUrl: 'path-to-chair-image1.jpg', description: 'Comfortable chair', category: 'chairs' },
//     { name: 'Bed 1', price: 59.99, imageUrl: 'path-to-bed-image1.jpg', description: 'King size bed', category: 'beds' },
//     { name: 'Furniture Set', price: 99.99, imageUrl: 'path-to-furniture-image1.jpg', description: 'Modern furniture set', category: 'furniture' },
//     { name: 'Decor Item', price: 19.99, imageUrl: 'path-to-decor-image1.jpg', description: 'Beautiful home decor', category: 'home-decor' },
//     // More products with appropriate categories
//   ];

//   filteredProducts = this.products;

//   @HostListener('document:click', ['$event'])
//   handleClickOutside(event: MouseEvent) {
//     const menu = document.querySelector('.side-menu');
//     const toolbar = document.querySelector('mat-toolbar');

//     if (this.menuOpen && menu && !(menu as HTMLElement).contains(event.target as Node) && toolbar && !(toolbar as HTMLElement).contains(event.target as Node)) {
//       this.closeMenu();
//     }
//   }

//   toggleMenu(event: MouseEvent) {
//     this.menuOpen = !this.menuOpen;
//     event.stopPropagation(); // Prevent the click from propagating to the document
//   }

//   closeMenu() {
//     this.menuOpen = false;
//   }

//   onCategoryChange(selectedCategory: string) {
//     this.filteredProducts = selectedCategory === 'all' ? 
//       this.products : 
//       this.products.filter(product => product.category === selectedCategory);
//   }
// }

import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../cart.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    RouterModule
  ]
})
export class ShopComponent {
  menuOpen = false;
  products = [
    { name: 'Chair 1', price: 29.99, imageUrl: 'assets/im.png', description: 'Comfortable chair', category: 'chairs' },
    { name: 'Bed 1', price: 59.99, imageUrl: 'assets/im.png', description: 'King size bed', category: 'beds' },
    { name: 'Furniture Set', price: 99.99, imageUrl: 'assets/im.png', description: 'Modern furniture set', category: 'furniture' },
    { name: 'Decor Item', price: 19.99, imageUrl: 'assets/im.png', description: 'Beautiful home decor', category: 'home-decor' },
  ];

  filteredProducts = this.products;

  constructor(private router: Router, private cartService: CartService) {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const menu = document.querySelector('.side-menu');
    const toolbar = document.querySelector('mat-toolbar');

    if (this.menuOpen && menu && !(menu as HTMLElement).contains(event.target as Node) && toolbar && !(toolbar as HTMLElement).contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  toggleMenu(event: MouseEvent) {
    this.menuOpen = !this.menuOpen;
    event.stopPropagation();
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onCategoryChange(selectedCategory: string) {
    this.filteredProducts = selectedCategory === 'all' ? 
      this.products : 
      this.products.filter(product => product.category === selectedCategory);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
}
