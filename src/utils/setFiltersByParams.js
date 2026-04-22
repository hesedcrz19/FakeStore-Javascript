import { FILTERS_KEYS, FILTERS_DEFAULT_VALUES } from '@/const';

export function setFiltersByParams(searchParams) {
  return {
    search:
      searchParams.get(FILTERS_KEYS.SEARCH) ||
      FILTERS_DEFAULT_VALUES[FILTERS_KEYS.SEARCH],
    minPrice:
      searchParams.get(FILTERS_KEYS.MIN_PRICE) ||
      FILTERS_DEFAULT_VALUES[FILTERS_KEYS.MIN_PRICE],
    maxPrice:
      searchParams.get(FILTERS_KEYS.MAX_PRICE) ||
      FILTERS_DEFAULT_VALUES[FILTERS_KEYS.MAX_PRICE],
    category:
      searchParams.get(FILTERS_KEYS.CATEGORY) ||
      FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY],
  };
}
