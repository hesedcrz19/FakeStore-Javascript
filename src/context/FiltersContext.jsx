import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";

import { useProducts } from "./ProductsContext";
import { productsFetch } from "../services/productsFetch";

const FiltersContext = createContext(null);

const areSameObjects = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (const i in obj1) {
    if (obj1[i] !== obj2[i]) return false;
  }

  return true;
};

let delay;

const filtersReductor = (filters, { type, value, filter }) => {
  delay = 300;

  switch (type) {
    case "NUMBER": {
      if (!/^[0-9]*$/.test(value)) return filters;

      return { ...filters, [filter]: value };
    }

    case "RADIO": {
      delay = 0;

      return { ...filters, [filter]: value };
    }

    default: {
      return { ...filters, [filter]: value };
    }
  }
};

export function FiltersProvider({ children }) {
  const { fetchFilters, setFetchFilters } = useProducts();
  const [filters, dispatchFilters] = useReducer(filtersReductor, fetchFilters);
  const previousFilters = useRef(fetchFilters);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(filters);
      console.log(previousFilters.current);

      if (areSameObjects(previousFilters.current, filters)) return;

      previousFilters.current = filters;

      setFetchFilters(filters);
    }, delay);

    return () => clearTimeout(timeout);
  }, [filters]);

  return (
    <FiltersContext.Provider value={{ filters, dispatchFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);

  if (!context)
    throw new Error("useFilters must be used within ProductsProvider");

  return context;
}
