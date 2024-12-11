import { Component } from '@angular/core';
import { Product } from '../../types/product';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../products/product.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-products',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css'
})
export class EditProductsComponent {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  productForm: FormGroup;
  sizeOptions: string[] = [];

  constructor(private productService: ProductService, private fb: FormBuilder ,private toastr: ToastrService , private router: Router ) {
    this.productForm = this.fb.group({
      name: '',
      category: '',
      brand: '',
      image: '',
      color: '',
      material: '',
      gender: '',
      price: 0,
      description: '',
      sizes: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    console.log(this.products);
       
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
      
    });
  }

  openEditModal(product: Product): void {
    this.selectedProduct = product;

    this.productForm.patchValue({
      name: product.name,
      category: product.category,
      brand: product.brand,
      image: product.image,
      color: product.color,
      material: product.material,
      gender: product.gender,
      price: product.price,
      description: product.description,
    });
  
    const sizesArray = this.sizes;
    sizesArray.clear();
  
    if (product.sizes && product.sizes.length > 0) {
      product.sizes.forEach(size => {
        sizesArray.push(this.fb.group({
          size: [size.size, Validators.required],
          stock: [size.stock, [Validators.required, Validators.min(0)]],
        }));
      });
    }
  }
  
  

  closeModal(): void {
    this.selectedProduct = null;
    this.productForm.reset();
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  addSize(): void {
    const sizeGroup = this.fb.group({
      size: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
    });
    this.sizes.push(sizeGroup);
  }

  removeSize(index: number): void {
    this.sizes.removeAt(index);
  }


  onUpdate(): void {
    if (this.selectedProduct && this.productForm.valid) {
      const updatedProduct = { ...this.selectedProduct, ...this.productForm.value };

      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
          this.toastr.success('Product updated successfully!', 'Success');
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.toastr.error('Failed to update the product.', 'Error');  
        }
      });
    }
  }
}
