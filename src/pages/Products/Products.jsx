import styles from "./Products.module.css";
import { useEffect, useState } from "react";

import { ProductsGrid } from "../../Layouts/ProductsGrid/ProductsGrid.jsx";
import { LoaderCube } from "../../components/LoaderCube/LoaderCube.jsx";
import { Filters } from "../../components/Filters/Filters.jsx";


export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      try {
        setLoading(true);
        const data = await fetch("https://api.escuelajs.co/api/v1/products");
        const products = await data.json();
        console.log(products)
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetching();
  }, []);

  return (
    <main className={styles.mainContainer}>
      {loading ? <LoaderCube /> : <ProductsGrid products={products} />}
    </main>
  );
}
