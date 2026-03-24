import styles from "./Products.module.css";

import { useProducts } from "@/context/ProductsContext";

import { ProductsGrid } from "@/Layouts/ProductsGrid/ProductsGrid.jsx";
import { LoaderCube } from "@/components/LoaderCube/LoaderCube.jsx";

export function Products() {
  const { products, loading } = useProducts();

  return (
    <main className={styles.mainContainer}>
      {loading ? <LoaderCube /> : <ProductsGrid products={products} />}
    </main>
  );
}
