import { FILTERS_KEYS } from '@/consts/filtersConsts';

import { useReducer, useCallback } from 'react';

import { filtersReducer } from '@/reducers/filtersReducer.js';
import type { Filters } from '@/types/filtersTypes';

export interface Changers {
  changeCategory: (value: string) => void;
  changeText: (value: string) => void;
  changeMinPrice: (value: string) => void;
  changeMaxPrice: (value: string) => void;
  changeSortBy: (value: string) => void;
  changeSortOrder: (value: string) => void;
  changeMinDiscount: (value: string) => void;
  changeFreeShipping: (values: string) => void;
  changeHasPromotion: (values: string) => void;
}

export function useFiltersReducer(initialState: Filters) {
  const [filters, dispatchFilters] = useReducer(filtersReducer, initialState, (filters) => {
    return filters;
  });

  const newFilters = useCallback((newFilters: Filters) => {
    dispatchFilters({
      type: 'NEW',
      newState: newFilters,
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
  const changeText = useCallback((value: string) => {
    dispatchFilters({
      type: 'STRING',
      filter: FILTERS_KEYS.SEARCH,
      value: value,
    });
  }, []);
  const changeCategory = useCallback((value: string) => {
    dispatchFilters({
      type: 'STRING',
      filter: FILTERS_KEYS.CATEGORY,
      value: value,
    });
  }, []);
  const changeSortBy = useCallback((value: string) => {
    dispatchFilters({
      type: 'STRING',
      filter: FILTERS_KEYS.SORT_BY,
      value: value,
    });
  }, []);
  const changeSortOrder = useCallback((value: string) => {
    dispatchFilters({
      type: 'STRING',
      filter: FILTERS_KEYS.SORT_ORDER,
      value: value,
    });
  }, []);
  const changeMinDiscount = useCallback((value: string) => {
    dispatchFilters({
      type: 'STRING',
      filter: FILTERS_KEYS.MIN_DISCOUNT,
      value: value,
    });
  }, []);
  const changeHasPromotion = useCallback((value: string) => {
    dispatchFilters({
      type: 'STRING',
      filter: FILTERS_KEYS.HAS_PROMOTION,
      value: value,
    });
  }, []);
  const changeFreeShipping = useCallback((value: string) => {
    dispatchFilters({
      type: 'STRING',
      filter: FILTERS_KEYS.FREE_SHIPPING,
      value: value,
    });
  }, []);

  const changers: Changers = {
    changeCategory,
    changeMaxPrice,
    changeMinPrice,
    changeText,
    changeSortBy,
    changeSortOrder,
    changeMinDiscount,
    changeFreeShipping,
    changeHasPromotion,
  };

  return { filters, changers, newFilters };
}
