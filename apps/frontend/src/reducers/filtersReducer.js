export const filtersReducer = (filters, { type, value, filter, newState }) => {
  switch (type) {
    case 'NUMBER': {
      if (!/^[0-9]*(\.[0-9]{0,2})?$/.test(value) && value.length >= filters[filter].length)
        return filters;

      return { ...filters, [filter]: value };
    }

    case 'TEXT': {
      return { ...filters, [filter]: value };
    }

    case 'NEW': {
      return newState;
    }
    default: {
      return filters;
    }
  }
};
