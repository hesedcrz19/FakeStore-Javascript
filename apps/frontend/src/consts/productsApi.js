import { FILTERS_KEYS } from './filtersConsts.js';
import { API_HOST } from '@/config.js';

export const PRODUCTS_API_URL = `${API_HOST}/products`;

export const PRODUCTS_API_FILTERS = {
  [FILTERS_KEYS.MIN_PRICE]: 'minPrice',
  [FILTERS_KEYS.MAX_PRICE]: 'maxPrice',
  [FILTERS_KEYS.SEARCH]: 'title',
  [FILTERS_KEYS.CATEGORY]: 'categorySlug',
};
