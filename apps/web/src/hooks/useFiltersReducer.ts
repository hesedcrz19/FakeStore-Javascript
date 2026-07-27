import { FILTERS_KEYS } from '@/consts/filtersConsts';

import { useReducer, useCallback } from 'react';

import { filtersReducer } from '@/reducers/filtersReducer.js';
import type { Filters } from '@/types/filtersTypes';

export interface Changers {
  changeCategory: (value: string) => void;
  changeText: (value: string) => void;
  changeMinPrice: (value: string) => void;
  changeMaxPrice: (value: string) => void;
}

export function useFiltersReducer(initialState: Filters) {
  const [filters, dispatchFilters] = useReducer(filtersReducer, initialState);

  const changeText = useCallback((value: string) => {
    dispatchFilters({
      type: 'TEXT',
      filter: FILTERS_KEYS.SEARCH,
      value: value,
    });
  }, []);
  const changeCategory = useCallback((value: string) => {
    dispatchFilters({
      type: 'TEXT',
      filter: FILTERS_KEYS.CATEGORY,
      value: value,
    });
  }, []);
  const changeMinPrice = useCallback((value: string) => {
    dispatchFilters({
      type: 'NUMBER',
      filter: FILTERS_KEYS.MIN_PRICE,
      value: value,
    });
  }, []);
  const changeMaxPrice = useCallback((value: string) => {
    dispatchFilters({
      type: 'NUMBER',
      filter: FILTERS_KEYS.MAX_PRICE,
      value: value,
    });
  }, []);

  const newFilters = useCallback((newFilters: Filters) => {
    dispatchFilters({
      type: 'NEW',
      newState: newFilters,
    });
  }, []);

  const changers: Changers = {
    changeCategory,
    changeMaxPrice,
    changeMinPrice,
    changeText,
  };

  return { filters, changers, newFilters };
}
