import { Product } from './product';

export interface ShippingDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
}

export interface OrderItem {
  _id: string;
  productId: Product;
  quantity: number;
  price: number;
  selectedSize: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  shippingDetails: ShippingDetails[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
