import { createContext, useContext, useState, useEffect, useRef } from "react";
import { productsFetch } from "../services/productsFetch";

const ProductsContext = createContext(null);

function areEquals(x, y) {
  if (x === y) return true;
  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  if (Object.keys(x).length !== Object.keys(y).length) return false;

  for (let prop in x) {
    if (!y.hasOwnProperty(prop) || !areEquals(x[prop], y[prop])) return false;
  }
  return true;
}

export function ProductsProvider({
  children,
  initialFilters = { minPrice: "", maxPrice: "", search: "", category: "all" },
}) {
  const [fetchFilters, setFetchFilters] = useState(initialFilters);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    productsFetch(fetchFilters)
      .then((products) => {
        setProducts(products);
        console.log(products);
      })
      .catch((error) => {
        setError(true);
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  }, [fetchFilters]);

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, setFetchFilters, fetchFilters }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context)
    throw new Error("useProducts must be used within ProductsProvider");

  return context;
}
