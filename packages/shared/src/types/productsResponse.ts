import { Product } from './product.js';

export interface ProductsResponse {
  pagination: {
    page: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  data: Product[];
}
