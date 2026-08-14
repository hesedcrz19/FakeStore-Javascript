export const FILTERS_KEYS = {
  SEARCH: 'search',
  MIN_PRICE: 'min_price',
  MAX_PRICE: 'max_price',
  CATEGORY: 'category',
} as const;
export const FILTERS_DEFAULT_VALUES = {
  [FILTERS_KEYS.SEARCH]: '',
  [FILTERS_KEYS.MIN_PRICE]: '',
  [FILTERS_KEYS.MAX_PRICE]: '',
  [FILTERS_KEYS.CATEGORY]: '',
} as const;
