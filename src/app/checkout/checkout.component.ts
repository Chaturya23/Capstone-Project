import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
//   constructor(private router: Router) {}

//   onPlaceOrder() {
//     alert('Thank you for your shopping!');
//     this.router.navigate(['/home']); // Navigate to the home page after the alert
//   }
// }

checkoutForm!: FormGroup;

constructor(private fb: FormBuilder, private router: Router) {}

ngOnInit() {
  this.checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
    cardholderName: ['', Validators.required],
    expiryDate: ['', Validators.required],
    cvc: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
  });
}

onPlaceOrder() {
  if (this.checkoutForm.valid) {
    alert('Thank you for your shopping!');
    this.router.navigate(['/home']); // Navigate to the home page after the alert
  } else {
    alert('Please fill out all required fields correctly.');
  }
}
}
