import { createContext, useContext, useEffect, useRef } from 'react';

import { useFiltersReducer, type Changers } from '@/hooks/useFiltersReducer';

import { areSameObjects } from '@/utils/areSameObject';
import { setFiltersByParams } from '@/utils/setFiltersByParams';
import { setSearchParamsByFilters } from '@/utils/setSearchParamsByFilters';

import type { Filters } from '@/types/filtersTypes';
import { useSearchParams } from 'react-router';

interface FiltersContextType {
  filters: Filters;
  changers: Changers;
}

const FiltersContext = createContext<FiltersContextType | null>(null);

export function FiltersProvider({ children }: React.PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, changers, newFilters } = useFiltersReducer(setFiltersByParams(searchParams));
  const previousFilters = useRef<Filters>(setFiltersByParams(searchParams));
  const filtersReadyRef = useRef<boolean>(true);

  useEffect(() => {
    if (areSameObjects(previousFilters.current, filters)) return;

    let delay;
    filtersReadyRef.current = false;

    if (previousFilters.current.sort_by !== filters.sort_by) {
      delay = 0;
    } else {
      delay = 300;
    }

    const timeout = setTimeout(() => {
      previousFilters.current = filters;
      filtersReadyRef.current = true;
      setSearchParams(setSearchParamsByFilters(filters));
    }, delay);

    return () => clearTimeout(timeout);
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (areSameObjects(setFiltersByParams(searchParams), filters) || !filtersReadyRef.current)
      return;
    newFilters(setFiltersByParams(searchParams));
  }, [searchParams, newFilters, filters]);

  return (
    <FiltersContext.Provider value={{ filters, changers }}>{children}</FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);

  if (!context) throw new Error('useFilters must be used within FiltersProvider');

  return context;
}
