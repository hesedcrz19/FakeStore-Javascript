import styles from "./ProductsGrid.module.css"

import { useRef, useEffect } from "react";
import { useMatchMedia } from "../../hooks/useMatchMedia.jsx";

import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import { Filters } from "../../components/Filters/Filters.jsx";
import { FiltersDialog } from "../../components/FiltersDialog/FiltersDialog.jsx";


export function ProductsGrid({ products }) {
  const buttonRef = useRef(null);

  const isPc = useMatchMedia("(min-width: 1000px)");

  return (
    <>
      <section className={styles.productsContainer}>
        {/*--------- Only can open in small screens------- */}

        <div className={styles.productsHeader}>
          <h2>Productos ({products.length})</h2>

          {/* Only in small screens */}
          {!isPc &&
            <button className={styles.filtersButton} ref={buttonRef} aria-label="open filters">
              Filters
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" /></svg>
            </button>
          }
        </div>

        <div className={styles.productsGrid}>
          {products.map((product) => {
            if (product.id >= 1000) return
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>

      </section>
      
      {/* Only in big screen */}
      {isPc &&
        <Filters />
      }

      <FiltersDialog openBtn={buttonRef} />
    </>
  );
}