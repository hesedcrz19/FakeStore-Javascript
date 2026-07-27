import { FILTERS_KEYS, FILTERS_DEFAULT_VALUES } from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';

export function setFiltersByParams(searchParams: URLSearchParams): Filters {
  const filters = {} as Filters;

  for (const filterKey of Object.values(FILTERS_KEYS)) {
    filters[filterKey] = searchParams.get(filterKey) || FILTERS_DEFAULT_VALUES[filterKey];
  }

  return filters;
}
