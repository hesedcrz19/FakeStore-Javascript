import styles from "../styles/Products.module.css"

import { ProductCard } from "../components/ProductCard.jsx";

export function ProductsGrid({ products }){
  return(
    <>
      <h2>Productos ({products.length})</h2>

      <div className={styles.productsGrid}>
        {products.map((product) => {
          if (product.id >= 52) return; /* Items invalids*/
          return (<ProductCard key={product.id} product={product} />)})
        }
      </div>
    </>
  )
}