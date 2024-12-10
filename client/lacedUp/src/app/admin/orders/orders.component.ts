import { Component } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: Order[] = [];
  selectedOrder: any = null;
  isModalOpen: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        console.log(data);
        this.orders = data;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  openModal(order: any): void {
    this.selectedOrder = order;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedOrder = null;
  }

  approveOrder(orderId: string): void {
    this.orderService.approveOrder(orderId).subscribe({
      next: (response) => {
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error approving order', error);
      },
    });
  }

  rejectOrder(orderId: string): void {
    this.orderService.rejectOrder(orderId).subscribe({
      next: (response) => {
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error rejecting order', error);
      },
    });
  }
}
