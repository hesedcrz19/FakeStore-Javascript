import { FILTERS_DEFAULT_VALUES } from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';

export const setSearchParamsByFilters = (filters: Filters) => {
  const searchParams = new URLSearchParams();

  for (const filter of Object.keys(filters) as (keyof Filters)[]) {
    if (filters[filter] !== FILTERS_DEFAULT_VALUES[filter])
      searchParams.set(filter, filters[filter]);
  }

  return searchParams;
};
