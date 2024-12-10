import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../types/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>('/api/cart');
  }

  updateCartItemSize(productId: string, size: string): Observable<CartItem> {
    const data = { productId, size };
    return this.http.put<CartItem>('/api/cart/size', data);
  }

  addItemToCart(productId: string, quantity: number): Observable<CartItem> {
    const data = { productId, quantity };
    return this.http.post<CartItem>('/api/cart', data);
  }

  removeItemFromCart(productId: string): Observable<CartItem> {
    return this.http.delete<CartItem>(`/api/cart/${productId}`);
  }

  updateCartItem(productId: string, quantity: number): Observable<CartItem> {
    const data = { productId, quantity };
    return this.http.put<CartItem>('/api/cart', data);
  }

  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>('/api/cart');
  }

  checkout(): Observable<Cart> {
    return this.http.post<Cart>('/api/cart/checkout', {});
  }
}
