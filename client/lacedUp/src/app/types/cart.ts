import { Product } from "./product";

export interface CartItem {
  productId: Product;
  quantity: number;
  price: number;
  selectedSize?: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}
