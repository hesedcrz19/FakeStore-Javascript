import { create } from 'zustand';
import { productsFetch } from '@/services/productsFetch.js';
import { formatProduct } from '@/utils/formatProducts';
import type { Filters } from '@/types/filtersTypes';
import type { FormattedProduct } from '@/types/formattedProduct';
import { AppError } from '@trending-market/shared';

interface ProductsStore {
  products: FormattedProduct[];
  productsLength: number;
  loading: boolean;
  longLoading: boolean;
  error: null | AppError | Error;
  fetchFilters: Filters | null;
  fetchProducts: (filters: Filters) => Promise<void>;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  productsLength: 0,
  loading: true,
  longLoading: false,
  error: null,
  fetchFilters: null,

  fetchProducts: async (filters: Filters) => {
    set({ products: [], loading: true, error: null, fetchFilters: filters, productsLength: 0 });

    const timeout = setTimeout(() => {
      set({ longLoading: true });
    }, 5000);

    try {
      const products = await productsFetch(filters);
      set({
        products: products.map((p) => formatProduct(p)),
        error: null,
        productsLength: products.length,
      });
    } catch (e) {
      if (e instanceof Error || e instanceof AppError) {
        set({ error: e });
      } else {
        set({ error: new Error('Error fetching the products') });
      }
    } finally {
      clearTimeout(timeout);
      set({ loading: false, longLoading: false });
    }
  },
}));
