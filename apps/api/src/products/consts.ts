export const SORT_OPTIONS = {
  TITLE: 'title',
  PRICE: 'price',
  RATING: 'rating',
  NEWEST: 'newest',
} as const;
export const SORT_OPTIONS_DEFAULT = SORT_OPTIONS.NEWEST;
export const SORT_ORDER_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
export const SORT_ORDER_OPTIONS_DEFAULT = SORT_ORDER_OPTIONS.DESC;
