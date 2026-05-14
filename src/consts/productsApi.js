import { FILTERS_KEYS } from './filtersConsts.js';

export const PRODUCTS_API_URL = 'https://fake-store-api-bjbq.onrender.com/products';

export const PRODUCTS_API_FILTERS = {
  [FILTERS_KEYS.MIN_PRICE]: 'minPrice',
  [FILTERS_KEYS.MAX_PRICE]: 'maxPrice',
  [FILTERS_KEYS.SEARCH]: 'title',
  [FILTERS_KEYS.CATEGORY]: 'categorySlug',
};
