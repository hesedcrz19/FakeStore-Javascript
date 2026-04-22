import { FILTERS_KEYS } from '@/const.js';

import { useReducer, useCallback } from 'react';

import { filtersReducer } from '@/reducers/filtersReducer';

export function useFiltersReducer(initialState) {
  const [filters, dispatchFilters] = useReducer(filtersReducer, initialState);

  const changeText = useCallback((value) => {
    dispatchFilters({
      type: 'TEXT',
      filter: FILTERS_KEYS.SEARCH,
      value: value,
    });
  }, []);
  const changeCategory = useCallback((value) => {
    dispatchFilters({
      type: 'RADIO',
      filter: FILTERS_KEYS.CATEGORY,
      value: value,
    });
  }, []);
  const changeMinPrice = useCallback((value) => {
    dispatchFilters({
      type: 'NUMBER',
      filter: FILTERS_KEYS.MIN_PRICE,
      value: value,
    });
  }, []);
  const changeMaxPrice = useCallback((value) => {
    dispatchFilters({
      type: 'NUMBER',
      filter: FILTERS_KEYS.MAX_PRICE,
      value: value,
    });
  }, []);

  const newFilters = useCallback((newFilters) => {
    dispatchFilters({
      type: 'NEW',
      newState: newFilters,
    });
  }, []);

  const changers = {
    changeCategory,
    changeMaxPrice,
    changeMinPrice,
    changeText,
  };

  return { filters, changers, newFilters };
}
