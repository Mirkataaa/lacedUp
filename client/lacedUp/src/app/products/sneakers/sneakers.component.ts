import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { ProductService } from '../product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-sneakers',
  standalone: true,
  imports: [CommonModule, InfiniteScrollDirective, RouterLink],
  templateUrl: './sneakers.component.html',
  styleUrl: './sneakers.component.css',
})
export class SneakersComponent {
  products: Product[] = [];
  offset = 0;
  limit = 4;
  category: string = 'sneakers';
  productId: string = '';
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onScroll();
  }

  onScroll(): void {
    this.productService
      .getProductsByCategory('Sneakers', this.offset, this.limit)
      .subscribe((response) => {
        this.products = [...this.products, ...response.products];
        this.offset += this.limit;
      });
  }
}
