import {
  FILTERS_KEYS,
  FILTERS_DEFAULT_VALUES,
  SORT_BY_OPTIONS,
  SORT_ORDER_OPTIONS,
  FREE_SHIPPING_TRUE,
  HAS_PROMOTION_TRUE,
} from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';

export function setFiltersByParams(searchParams: URLSearchParams): Filters {
  const filters = {} as Filters;

  for (const filterKey of Object.values(FILTERS_KEYS)) {
    const paramsFilter = searchParams.get(filterKey);

    if (filterKey === FILTERS_KEYS.SORT_BY) {
      if (!SORT_BY_OPTIONS.includes(paramsFilter as (typeof SORT_BY_OPTIONS)[number])) {
        filters[filterKey] = FILTERS_DEFAULT_VALUES[filterKey];
        continue;
      }
    }
    if (filterKey === FILTERS_KEYS.SORT_ORDER) {
      if (!SORT_ORDER_OPTIONS.includes(paramsFilter as (typeof SORT_ORDER_OPTIONS)[number])) {
        filters[filterKey] = FILTERS_DEFAULT_VALUES[filterKey];
        continue;
      }
    }
    if (filterKey === FILTERS_KEYS.MIN_DISCOUNT) {
      if (isNaN(Number(paramsFilter))) {
        filters[filterKey] = FILTERS_DEFAULT_VALUES[filterKey];
        continue;
      }
    }
    if (filterKey === FILTERS_KEYS.FREE_SHIPPING) {
      if (paramsFilter !== FREE_SHIPPING_TRUE) {
        filters[filterKey] = FILTERS_DEFAULT_VALUES[filterKey];
        continue;
      }
    }
    if (filterKey === FILTERS_KEYS.HAS_PROMOTION) {
      if (paramsFilter !== HAS_PROMOTION_TRUE) {
        filters[filterKey] = FILTERS_DEFAULT_VALUES[filterKey];
        continue;
      }
    }

    filters[filterKey] = paramsFilter || FILTERS_DEFAULT_VALUES[filterKey];
  }

  return filters;
}
