import styles from "./ProductsGrid.module.css";

import { useMatchMedia } from "@/hooks/useMatchMedia.js";
import { FiltersProvider } from "@/context/FiltersContext";

import { ProductCard } from "@/components/ProductCard/ProductCard.jsx";
import { FiltersButton } from "@/components/FiltersButton/FiltersButton.jsx";

export function ProductsGrid({ products }) {
  return (
    <FiltersProvider>
      <section className={styles.productsContainer}>
        {/*--------- Only can open in small screens------- */}

        <div className={styles.productsHeader}>
          <h2>Productos ({products?.length ?? 0})</h2>

          <FiltersButton />
        </div>

        <div className={styles.productsGrid}>
          {products.map((product) => {
            if (product.id >= 1000) return;
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </FiltersProvider>
  );
}
