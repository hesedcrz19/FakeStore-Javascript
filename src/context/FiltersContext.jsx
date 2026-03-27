import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useReducer,
} from "react";

import { useProducts } from "./ProductsContext";
import { useRouter } from "@/hooks/useRoute";

import { filtersReducer } from "@/reducers/filtersReducer";

const FiltersContext = createContext(null);

const areSameObjects = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (const i in obj1) {
    if (obj1[i] !== obj2[i]) return i;
  }

  return true;
};

export function FiltersProvider({ children }) {
  const { fetchFilters } = useProducts();
  const [filters, dispatchFilters] = useReducer(filtersReducer, fetchFilters);
  const previousFilters = useRef(fetchFilters);
  const { navigateTo } = useRouter();

  useEffect(() => {
    let delay = 300;

    const comparation = areSameObjects(previousFilters.current, filters);
    if (comparation === true) return;
    if (comparation === "category") delay = 0;

    const timeout = setTimeout(() => {
      previousFilters.current = filters;

      const params = new URLSearchParams();

      for (const i in filters) {
        if (!filters[i] || (i === "category" && filters[i] === "all")) continue;
        params.append(i, filters[i]);
      }

      const newURL = `${window.location.pathname}?${params.toString()}`;

      if (newURL === `${window.location.pathname}?${window.location.search}`) return

      navigateTo(newURL);

      console.log('navigating')
    }, delay);

    return () => clearTimeout(timeout);
  }, [filters]);

  useEffect(() => {
    if (areSameObjects(fetchFilters, filters) === true) return
    dispatchFilters({ newState: fetchFilters });
  }, [fetchFilters]);

  const changeText = (event) => {
    dispatchFilters({
      type: "TEXT",
      filter: "search",
      value: event.target.value,
    });
  };
  const changeCategory = (event) => {
    dispatchFilters({
      type: "RADIO",
      filter: "category",
      value: event.target.value,
    });
  };
  const changeMinPrice = (event) => {
    dispatchFilters({
      type: "NUMBER",
      filter: "minPrice",
      value: event.target.value,
    });
  };
  const changeMaxPrice = (event) => {
    dispatchFilters({
      type: "NUMBER",
      filter: "maxPrice",
      value: event.target.value,
    });
  };

  const changers = {
    changeCategory,
    changeMaxPrice,
    changeMinPrice,
    changeText,
  };

  return (
    <FiltersContext.Provider value={{ filters, changers }}>
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
