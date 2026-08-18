import { FILTERS_KEYS } from './filtersConsts';
import { API_HOST } from '@/config.js';

export const PRODUCTS_API_URL = `${API_HOST}/products`;

export const PRODUCTS_API_FILTERS = {
  [FILTERS_KEYS.MIN_PRICE]: 'minPrice',
  [FILTERS_KEYS.MAX_PRICE]: 'maxPrice',
  [FILTERS_KEYS.SEARCH]: 'title',
  [FILTERS_KEYS.CATEGORY]: 'categorySlug',
  [FILTERS_KEYS.SORT_BY]: 'sortBy',
  [FILTERS_KEYS.SORT_ORDER]: 'sortOrder',
  [FILTERS_KEYS.MIN_DISCOUNT]: 'minDiscountPercentage',
  [FILTERS_KEYS.FREE_SHIPPING]: 'freeShipping',
  [FILTERS_KEYS.HAS_PROMOTION]: 'hasPromotion',
} as const;
