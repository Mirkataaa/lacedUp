import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductsByCategory(
    category: string,
    offset: number,
    limit: number
  ): Observable<{ products: Product[] }> {
    const url = `/api/products/${category}?offset=${offset}&limit=${limit}`;
    return this.http.get<{ products: Product[] }>(url);
  }

  getAllProducts(): Observable<Product[]> {
    const url = '/api/product';
    return this.http.get<Product[]>(url);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  addProduct(productData: Product): Observable<any> {
    const url = '/api/products';
    console.log(url);
    
    return this.http.post<any>(url, productData);
  }

  updateProduct(id: string, productData: Product): Observable<Product> {
    const url = `/api/product/${id}`;
    return this.http.put<Product>(url, productData);
  }

  deleteProduct(id: string): Observable<void> {
    const url = `/api/product/${id}`;
    return this.http.delete<void>(url);
  }
}