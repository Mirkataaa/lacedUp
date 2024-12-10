import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem } from '../../types/cart';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  orderForm: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  selectedSize: string = '';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        console.log(cart);

        this.cartItems = cart.items;
        this.totalPrice = this.calculateTotalPrice(this.cartItems);
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const shippingDetails = this.orderForm.value;
      const cart = this.cartItems;
      console.log('Shipping:', shippingDetails);
      console.log('cart:', cart);
    } else {
      console.log('Form is invalid');
    }
  }

  calculateTotalPrice(cartItems: CartItem[]): number {
    return cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  }
}
