import styles from './ProductsGrid.module.css';
import { ProductCard } from '@/components/ProductCard/ProductCard.jsx';
import { NotFound } from '@/components/NotFound/NotFound.jsx';

export function ProductsGrid({ products, loading }) {
  if (!products?.length && !loading) return <NotFound />;

  return (
    <ul className={styles.productsGrid} aria-label="Products list">
      {<ProductsCards products={products} loading={loading} />}
    </ul>
  );
}

function ProductsCards({ products, loading }) {
  if (loading)
    return Array.from({ length: 24 }).map((_, i) => <ProductCard key={i} loading={loading} />);

  return products?.map((product) => <ProductCard key={product.id} product={product} />);
}
