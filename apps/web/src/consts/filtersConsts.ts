export const SORT_BY = {
  TITLE: 'title',
  PRICE: 'price',
  RATING: 'rating',
  NEWEST: 'newest',
} as const;

export const SORT_BY_OPTIONS = Object.values(SORT_BY);

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const SORT_ORDER_OPTIONS = Object.values(SORT_ORDER);

export const FREE_SHIPPING_TRUE = 'true';
export const HAS_PROMOTION_TRUE = 'true';

export const FILTERS_KEYS = {
  SEARCH: 'search',
  MIN_PRICE: 'min_price',
  MAX_PRICE: 'max_price',
  CATEGORY: 'category',
  SORT_BY: 'sort_by',
  SORT_ORDER: 'sort_order',
  MIN_DISCOUNT: 'min_discount',
  FREE_SHIPPING: 'free_shipping',
  HAS_PROMOTION: 'has_promotion',
} as const;

export const FILTERS_DEFAULT_VALUES = {
  [FILTERS_KEYS.SEARCH]: '',
  [FILTERS_KEYS.MIN_PRICE]: '',
  [FILTERS_KEYS.MAX_PRICE]: '',
  [FILTERS_KEYS.CATEGORY]: '',
  [FILTERS_KEYS.SORT_BY]: SORT_BY.NEWEST,
  [FILTERS_KEYS.SORT_ORDER]: SORT_ORDER.DESC,
  [FILTERS_KEYS.MIN_DISCOUNT]: '0',
  [FILTERS_KEYS.FREE_SHIPPING]: '',
  [FILTERS_KEYS.HAS_PROMOTION]: '',
} as const;

export const PAGE = 'page';
