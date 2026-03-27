import { createContext, useContext, useState, useEffect } from "react";
import { productsFetch } from "@/services/productsFetch";
import { useRouter } from "@/hooks/useRoute";

const ProductsContext = createContext(null);


export function ProductsProvider({ children }) {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { navigateTo, searchParams } = useRouter();
  const setFiltersByParams = () => ({
      search: searchParams.get("search") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      category: searchParams.get("category") || "all",
    })
  const [fetchFilters, setFetchFilters] = useState(setFiltersByParams);

  useEffect(() => {
    setFetchFilters(setFiltersByParams);
  }, [searchParams]);

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
