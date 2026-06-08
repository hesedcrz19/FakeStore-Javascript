import styles from './ProductsGrid.module.css';
import { ProductCard } from '@/components/ProductCard/ProductCard.jsx';
import { NotFound } from '@/components/NotFound/NotFound.jsx';

export function ProductsGrid({ products, loading }) {
  if (!products?.length && !loading) return <NotFound />;

  return (
    <section className={styles.productsGrid}>
      {<ProductsCards products={products} loading={loading} />}
    </section>
  );
}

function ProductsCards({ products, loading }) {
  if (loading)
    return Array.from({ length: 24 }).map((_, i) => <ProductCard key={i} loading={loading} />);

  return products?.map((product) => <ProductCard key={product.id} product={product} />);
}
