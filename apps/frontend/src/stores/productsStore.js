import { create } from 'zustand';

import { productsFetch } from '@/services/productsFetch';

export const useProductsStore = create((set, get) => ({
  products: [],
  loading: true,
  error: null,
  fetchFilters: {},

  productsLength: () => {
    return get().products.length;
  },
  setFetchFilters: (filters) => {
    set({ fetchFilters: filters });
  },
  fetchProducts: async (filters) => {
    set({ loading: true, error: null });
    try {
      const products = await productsFetch(filters);
      set({ products: products, error: false, loading: false });
      console.log(products);
    } catch {
      set({ products: [], error: true, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));
