// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './products/products.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { ShopComponent } from './shop/shop.component';
// import { AboutComponent } from './about/about.component';
// import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'contact', component: ContactComponent },
];



