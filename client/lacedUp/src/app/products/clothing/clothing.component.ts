import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CartService } from '../../user/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [CommonModule, RouterLink, InfiniteScrollDirective],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.css',
})
export class ClothingComponent {
  products: Product[] = [];
  offset = 0;
  limit = 4;
  category: string = 'clothing';
  productId: string = '';
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.onScroll();
  }

  onScroll(): void {
    this.productService
      .getProductsByCategory('Clothing', this.offset, this.limit)
      .subscribe((response) => {
        this.products = [...this.products, ...response.products];
        this.offset += this.limit;
      });
  }

  addItem(productId: string, quantity: number = 1): void {
    this.cartService.addItemToCart(productId, quantity).subscribe({
      next: (data) => {
        console.log('Clothing data', data);
        this.toastr.success('Item added to cart successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
        this.toastr.error('Log in to add to cart!')
      },
    });
  }
}
