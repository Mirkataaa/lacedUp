import { Injectable } from '@angular/core';
import { CartItem } from '../types/cart';
import { Observable } from 'rxjs';
import { Order, OrderItem, ShippingDetails } from '../types/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(
    cartItems: CartItem[],
    shippingDetails: ShippingDetails,
    totalPrice: number
  ): Observable<OrderItem> {
    const orderData = {
      items: cartItems,
      shippingDetails: shippingDetails,
      totalPrice: totalPrice,
    };

    return this.http.post<OrderItem>('/api/order/createOrder', orderData);
  }

  getUserOrders(): Observable<Order> {
    const url = '/api/userOrders';
    return this.http.get<Order>(url);
  }

  getOrderById(orderId: string): Observable<Order> {
    const url = `/api/order/${orderId}`;
    return this.http.get<Order>(url);
  }

  getAllOrders(): Observable<Order[]> {
    const url = '/api/order/admin/orders';
    return this.http.get<Order[]>(url);
  }

  approveOrder(orderId: string): Observable<OrderItem> {
    const url = `/api/order/approve/${orderId}`;
    return this.http.put<OrderItem>(url, {});
  }

  rejectOrder(orderId: string): Observable<OrderItem> {
    const url = `/api/order/reject/${orderId}`;
    return this.http.put<OrderItem>(url, {});
  }
}
