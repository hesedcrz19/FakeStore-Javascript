import { FILTERS_KEYS } from '@/const';

import { createContext, useContext, useEffect, useRef } from 'react';

import { useRouter } from '@/hooks/useRoute.js';
import { useFiltersReducer } from '@/hooks/useFiltersReducer.js';

import { areSameObjects } from '@/utils/areSameObject.js';
import { differentObjectProperties } from '@/utils/differentObjectProperties';
import { setFiltersByParams } from '@/utils/setFiltersByParams.js';
import { setSearchParamsByFilters } from '@/utils/setSearchParamsByFilters.js';

const FiltersContext = createContext(null);

export function FiltersProvider(props) {
  const { setSearchParams, searchParams } = useRouter();
  const { filters, changers, newFilters } = useFiltersReducer(
    setFiltersByParams(searchParams)
  );
  const previousFilters = useRef(setFiltersByParams(searchParams));
  const filtersReadyRef = useRef(true);

  useEffect(() => {
    filtersReadyRef.current = false;
    let delay;

    if (areSameObjects(previousFilters.current, filters)) return;

    const differentProperties = differentObjectProperties(
      previousFilters.current,
      filters
    );
    if (differentProperties.includes(FILTERS_KEYS.CATEGORY)) {
      delay = 0;
    } else {
      delay = 300;
    }

    const timeout = setTimeout(() => {
      previousFilters.current = filters;

      setSearchParams(setSearchParamsByFilters(filters));
      filtersReadyRef.current = true;
    }, delay);

    return () => clearTimeout(timeout);
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (
      areSameObjects(setFiltersByParams(searchParams), filters) ||
      !filtersReadyRef.current
    )
      return;
    newFilters(setFiltersByParams(searchParams));
  }, [searchParams, newFilters, filters]);

  return <FiltersContext.Provider value={{ filters, changers }} {...props} />;
}

export function useFilters() {
  const context = useContext(FiltersContext);

  if (!context)
    throw new Error('useFilters must be used within FiltersProvider');

  return context;
}
