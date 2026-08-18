import { FILTERS_DEFAULT_VALUES, FILTERS_KEYS } from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';

export const setSearchParamsByFilters = (filters: Filters) => {
  const searchParams = new URLSearchParams();

  for (const filterKey of Object.values(FILTERS_KEYS)) {
    if (filters[filterKey] !== FILTERS_DEFAULT_VALUES[filterKey])
      searchParams.set(filterKey, filters[filterKey]);
  }

  return searchParams;
};
