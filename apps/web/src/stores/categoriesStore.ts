import { categoriesFetch } from '@/services/categoriesFetch';
import type { FormattedCategory } from '@/types/formattedCategory';
import { formatCategory } from '@/utils/formatCategory';
import { create } from 'zustand';

interface CategoriesStore {
  categories: FormattedCategory[];
  loading: boolean;
  error: null | true;
  fetchCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  loading: false,
  error: null,
  async fetchCategories() {
    set({ loading: true, error: null });
    try {
      const categories = await categoriesFetch();
      set({ categories: categories.map((cat) => formatCategory(cat)) });
    } catch {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
