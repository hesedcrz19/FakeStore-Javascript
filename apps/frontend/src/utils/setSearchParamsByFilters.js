import {
  FILTERS_KEYS,
  FILTERS_DEFAULT_VALUES,
} from '@/consts/filtersConsts.js';

export const setSearchParamsByFilters = (filters) => {
  const searchParams = new URLSearchParams();

  for (const key in filters) {
    if (
      !filters[key] ||
      (key === FILTERS_KEYS.CATEGORY &&
        filters[key] === FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY])
    ) {
      continue;
    } else {
      searchParams.set(key, filters[key]);
    }
  }

  return searchParams;
};
