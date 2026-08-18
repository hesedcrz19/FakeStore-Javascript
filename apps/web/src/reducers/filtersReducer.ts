import type { Filters, Filter } from '@/types/filtersTypes';

interface FiltersAction {
  type: 'NUMBER' | 'STRING';
  value: string;
  filter: Filter;
}

interface NewFiltersAction {
  type: 'NEW';
  newState: Filters;
}

export const filtersReducer = (
  filters: Filters,
  action: FiltersAction | NewFiltersAction
): Filters => {
  const { type } = action;

  switch (type) {
    case 'NUMBER': {
      const { value, filter } = action;
      if (!/^[0-9]*(\.[0-9]{0,2})?$/.test(value) && value.length >= filters[filter].length)
        return filters;

      return { ...filters, [filter]: value };
    }

    case 'STRING': {
      const { value, filter } = action;
      return { ...filters, [filter]: value };
    }

    case 'NEW': {
      return action.newState;
    }
    default: {
      return filters;
    }
  }
};
