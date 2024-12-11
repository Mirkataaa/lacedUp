import { Component } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private orderService: OrderService , private toastr: ToastrService) {}

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
        this.toastr.success('Order approved successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error approving order', error);
        this.toastr.error('Failed to approve order', 'Error');
      },
    });
  }

  rejectOrder(orderId: string): void {
    this.orderService.rejectOrder(orderId).subscribe({
      next: (response) => {
        this.loadOrders();
        this.toastr.success('Order rejected successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error rejecting order', error);
        this.toastr.error('Failed to reject order', 'Error');
      },
    });
  }
}
