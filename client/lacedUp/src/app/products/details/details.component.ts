import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category');
    const id = this.route.snapshot.paramMap.get('id');

    if (category && id) {
      this.productService.getProductByCategoryAndId(category, id).subscribe({
        next: (data) => {
          console.log(data);
          this.product = data;
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
}
