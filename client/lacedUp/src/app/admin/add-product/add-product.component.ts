import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../products/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productForm: FormGroup;
  sizeOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      material: ['', Validators.required],
      gender: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
      description: ['', Validators.required],
      sizes: this.fb.array([]),
    });
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  onCategoryChange(): void {
    const category = this.productForm.get('category')?.value;
    this.sizes.clear();

    if (category === 'Sneakers') {
      this.sizeOptions = ['39', '40', '41', '42', '43', '44', '45'];
      this.addSize();
    } else if (category === 'Clothing') {
      this.sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];
      this.addSize();
    } else if (category === 'Accessories') {
      this.sizeOptions = ['One Size'];
    } else {
      this.sizeOptions = [];
    }
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

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Form Submitted', this.productForm.value);

      this.productService.addProduct(this.productForm.value).subscribe({
        next: (response) => {
          console.log('Product added successfully', response);
          this.toastr.success('Product added successfully!', 'Success');
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          console.error('Error occurred while adding product', error);
          this.toastr.error('Failed to add product', 'Error');
        },
      });
    } else {
      this.toastr.warning('Please fill out the form correctly.', 'Warning');
    }
  }
}
