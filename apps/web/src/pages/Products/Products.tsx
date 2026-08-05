import styles from './Products.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useProductsStore } from '@/stores/productsStore';
import { useEffect } from 'react';
import { setFiltersByParams } from '@/utils/setFiltersByParams';
import { ProductsGrid } from '@/Layouts/ProductsGrid/ProductsGrid';
import { FiltersProvider } from '@/context/FiltersContext';
import { FiltersButton } from '@/components/FiltersButton/FiltersButton';
import { areSameObjects } from '@/utils/areSameObject';
import { useSearchParams } from 'react-router';

export default function Products() {
  const { fetchFilters, fetchProducts, counter, products, loading } = useProductsStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (fetchFilters === null || !areSameObjects(fetchFilters, setFiltersByParams(searchParams))) {
      void fetchProducts(setFiltersByParams(searchParams));
    }
  }, [searchParams, fetchProducts, fetchFilters]);

  return (
    <section className={styles.productsContainer} data-testid="products">
      <div className={styles.productsHeader}>
        <h2>{counter() ?? <Skeleton width={170} />}</h2>
        <FiltersProvider>
          <FiltersButton />
        </FiltersProvider>
      </div>
      <ProductsGrid products={products} loading={loading} />
    </section>
  );
}
