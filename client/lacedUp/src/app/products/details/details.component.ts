import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../../user/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  product: Product | null = null;
  error: string | null = null;
  selectedSize: string | null = null;
  productId: string = ''


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category');
    const id = this.route.snapshot.paramMap.get('id');

    if (category && id) {
      this.productService.getProductByCategoryAndId(category, id).subscribe({
        next: (data) => {
          this.product = data;
          this.productId = data._id;
        },
        error: (err) => {
          this.error = 'Failed to load product details';
          console.error(err);
        },
      });
    } else {
      this.error = 'Invalid product details';
    }
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addItem(productId: string, quantity: number = 1): void {
    this.cartService.addItemToCart(productId, quantity).subscribe({
      next: (data) => {
        console.log( 'Details data' ,data);
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
      }
    });
  }
}
