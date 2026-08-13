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
import { LoadingDialog } from '@/components/LoadingDialog/LoadingDialog';

export default function Products() {
  const { fetchFilters, fetchProducts, counter, products, loading, longLoading, error } =
    useProductsStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (fetchFilters === null || !areSameObjects(fetchFilters, setFiltersByParams(searchParams))) {
      void fetchProducts(setFiltersByParams(searchParams));
    }
  }, [searchParams, fetchProducts, fetchFilters]);

  return (
    <section className={styles.productsContainer} data-testid="products">
      {longLoading && <LoadingDialog />}
      <div className={styles.productsHeader}>
        {!error && <h2>{counter() ?? <Skeleton width={170} />}</h2>}
        <FiltersProvider>
          <FiltersButton />
        </FiltersProvider>
      </div>
      <ProductsGrid products={products} loading={loading} error={error} />
    </section>
  );
}
