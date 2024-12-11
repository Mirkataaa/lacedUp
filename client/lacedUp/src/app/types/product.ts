export interface Product {
    _id: string;
    name: string;
    category: string;
    brand: string;
    image: string;
    color: string;
    description: string;
    price: number;
    sizes: { size: string; stock: number }[];
    material: string;
    gender: string;
    owner?: string | null
    createdAt?: Date;
    updatedAt?: Date;
  }