import styles from "../styles/Products.module.css"
import { useEffect, useState } from "react";

import { LoadingScreen } from "../components/LoadingScreen.jsx";
import { ProductsGrid } from "../components/ProductsGrid.jsx";
import { FiltersSection } from "../components/FiltersSection.jsx";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      const data = await fetch("https://api.escuelajs.co/api/v1/products");
      const products = await data.json();
      setProducts(products);
      setLoading(false);
    }

    fetching();
  }, []);

  const content = loading 
  ? <LoadingScreen />
  : <ProductsGrid products={products}></ProductsGrid> ;

  return (
    <main className={styles.mainContainer}>

      <section className={styles.productsContainer}>
        {content}
      </section>
      <FiltersSection />
    </main>
  );
}