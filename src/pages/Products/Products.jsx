import styles from "./Products.module.css";
import { useEffect, useState } from "react";

import { LoaderCube } from "../../components/LoaderCube/LoaderCube.jsx";
import { CategoryFilters } from "../../components/CategoryFilters/CategoryFilters.jsx";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";

function ProductsGrid({products}){
  return (
   <>
     <h2>Productos ({products.length})</h2>
 
     <div className={styles.productsGrid}>
       {products.map((product) => {
          if (product.id >= 1000) return
          return <ProductCard key={product.id} product={product} />;
       })}
     </div>
   </>
 );
}

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      try{
        setLoading(true);
        const data = await fetch("https://api.escuelajs.co/api/v1/products");
        const products = await data.json();
        console.log(products)
        setProducts(products);
        setLoading(false);
      } catch(error) {
        console.log(error);
      }
    }

    fetching();
  }, []);

  return (
    <main className={styles.mainContainer}>
      <section className={styles.productsContainer}>
        {loading ? <LoaderCube /> : <ProductsGrid products={products}/>}
      </section>

      <CategoryFilters className="bigForm"/>
    </main>
  );
}
