import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

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

  constructor(private productService: ProductService) {}
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
}
