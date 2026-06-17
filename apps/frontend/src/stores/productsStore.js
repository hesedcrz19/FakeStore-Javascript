import { FILTERS_DEFAULT_VALUES, FILTERS_KEYS } from '@/consts/filtersConsts';
import { create } from 'zustand';
import { productsFetch } from '@/services/productsFetch.js';
import { formatProduct } from '@/utils/formatProducts';

export const useProductsStore = create((set, get) => ({
  products: [],
  loading: true,
  error: null,
  fetchFilters: {},

  productsLength: () => get().products.length,
  counter: () => {
    const { loading, error, productsLength, fetchFilters } = get();
    const category =
      fetchFilters[FILTERS_KEYS.CATEGORY] === FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY]
        ? 'products'
        : fetchFilters[FILTERS_KEYS.CATEGORY];
    const categoryCapitalized = category?.charAt(0).toUpperCase() + category?.slice(1);
    return loading ? null : error ? '' : `${categoryCapitalized} (${productsLength()})`;
  },
  fetchProducts: async (filters) => {
    set({ loading: true, error: null, fetchFilters: filters });
    try {
      const products = await productsFetch(filters);
      set({ products: products.map((p) => formatProduct(p)), error: false });
      console.log(products);
    } catch {
      set({ products: [], error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
