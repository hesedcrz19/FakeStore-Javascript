import { FILTERS_DEFAULT_VALUES, FILTERS_KEYS } from '@/consts/filtersConsts';
import { create } from 'zustand';
import { productsFetch } from '@/services/productsFetch.js';
import { formatProduct } from '@/utils/formatProducts';
import type { Filters } from '@/types/filtersTypes';
import type { FormattedProduct } from '@/types/formattedProduct';

interface ProductsStore {
  products: FormattedProduct[];
  loading: boolean;
  longLoading: boolean;
  error: null | true;
  fetchFilters: Filters | null;
  productsLength: () => number;
  counter: () => string | null;
  fetchProducts: (filters: Filters) => Promise<void>;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  loading: true,
  longLoading: false,
  error: null,
  fetchFilters: null,

  productsLength: () => get().products.length,
  counter: () => {
    const { loading, error, productsLength, fetchFilters } = get();
    const category =
      fetchFilters?.[FILTERS_KEYS.CATEGORY] === FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY]
        ? 'products'
        : fetchFilters?.[FILTERS_KEYS.CATEGORY];
    const categoryCapitalized = category?.charAt(0).toUpperCase().concat(category?.slice(1));
    return loading ? null : error ? '' : `${categoryCapitalized} (${productsLength()})`;
  },
  fetchProducts: async (filters: Filters) => {
    set({ loading: true, error: null, fetchFilters: filters });

    const timeout = setTimeout(() => {
      set({ longLoading: true });
    }, 3000);

    try {
      const products = await productsFetch(filters);
      set({ products: products.map((p) => formatProduct(p)), error: null });
    } catch {
      set({ products: [], error: true });
    } finally {
      clearTimeout(timeout);
      set({ loading: false, longLoading: false });
    }
  },
}));
