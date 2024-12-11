import { Component } from '@angular/core';
import { Cart, CartItem } from '../../types/cart';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: Cart | null = null;
  productId: string = '';
  quantity: number = 1;
  subtotal: number = 0;
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => {
        console.log('Cart Data', data);
        this.cart = data;
        this.calculateTotal();
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
      },
    });
  }

  removeItem(productId: string) {
    this.cartService.removeItemFromCart(productId).subscribe({
      next: (data) => {
        this.toastr.success('Item removed from cart!', 'Success');
        this.loadCart();
      },
      error: (error) => {
        this.toastr.error('Error removing item from cart', 'Error');
        console.error('Error removing item from cart:', error);
      },
    });
  }

  calculateItemPrice(item: CartItem): number {
    return item.productId.price * item.quantity;
  }

  calculateTotal(): void {
    this.subtotal =
      this.cart?.items.reduce(
        (sum, item) => sum + this.calculateItemPrice(item),
        0
      ) || 0;
    this.total = this.subtotal + 4;
  }

  updateQuantity(item: CartItem, action: 'increase' | 'decrease') {
    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
      item.quantity -= 1;
    }
    this.updateCart(item);
  }

  updateCart(item: CartItem) {
    this.cartService
      .updateCartItem(item.productId._id, item.quantity)
      .subscribe({
        next: () => {
          this.calculateTotal();
        },
        error: (error) => console.error('Error updating cart item:', error),
      });
  }

  checkout() {
    this.router.navigate(['/checkout'], {
      state: { cartItems: this.cart?.items, totalPrice: this.total },
    });
  }

  selectSize(item: CartItem, size: string): void {
    this.cartService.updateCartItemSize(item.productId._id, size).subscribe({
      next: (updatedItem) => {
        item.selectedSize = updatedItem.selectedSize;
        console.log('Size updated successfully:', updatedItem);
      },
      error: (err) => {
        console.error('Failed to update size:', err);
      },
    });
  }
}
