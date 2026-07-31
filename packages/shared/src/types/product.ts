import type { Category } from './category.js';

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number;
  discount: number;
  discountPercentage: number;
  promotion: string | null;
  shippingCost: number;
  rating: number;
  description: string;
  category: Category;
  images: string[];
  updatedAt: string;
  createdAt: string;
}
