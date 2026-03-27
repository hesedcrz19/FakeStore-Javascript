export const filtersReducer = (filters, { type, value, filter, newState }) => {
    console.log(newState)
  if (newState) return newState;

  console.log(type)

  switch (type) {
    case "NUMBER": {
      if (!/^[0-9]*$/.test(value)) return filters;

      return { ...filters, [filter]: value };
    }

    case "RADIO": {
      return { ...filters, [filter]: value };
    }

    case "ALL": {
      return;
    }

    default: {
      return { ...filters, [filter]: value };
    }
  }
};
