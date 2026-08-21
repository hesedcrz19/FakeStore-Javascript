import { FILTERS_KEYS } from './filtersConsts';
import { API_HOST } from '@/config.js';

export const PRODUCTS_API_URL = `${API_HOST}/products`;

export const PRODUCTS_API_FILTERS = {
  [FILTERS_KEYS.MIN_PRICE]: 'min_price',
  [FILTERS_KEYS.MAX_PRICE]: 'max_price',
  [FILTERS_KEYS.SEARCH]: 'title',
  [FILTERS_KEYS.CATEGORY]: 'category_slug',
  [FILTERS_KEYS.SORT_BY]: 'sort_by',
  [FILTERS_KEYS.SORT_ORDER]: 'sort_order',
  [FILTERS_KEYS.MIN_DISCOUNT]: 'min_discount_percentage',
  [FILTERS_KEYS.FREE_SHIPPING]: 'free_shipping',
  [FILTERS_KEYS.HAS_PROMOTION]: 'has_promotion',
} as const;

export const PAGE_LENGTH = 12;
