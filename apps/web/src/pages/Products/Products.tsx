import styles from './Products.module.css';
import { useProductsStore } from '@/stores/productsStore';
import { useEffect } from 'react';
import { setFiltersByParams } from '@/utils/setFiltersByParams';
import { ProductsGrid } from '@/Layouts/ProductsGrid/ProductsGrid';
import { FiltersProvider } from '@/context/FiltersContext';
import { FiltersButton } from '@/components/FiltersButton/FiltersButton';
import { areSameObjects } from '@/utils/areSameObject';
import { useSearchParams } from 'react-router';
import { LoadingDialog } from '@/components/LoadingDialog/LoadingDialog';
import { CategoriesButtons } from '@/components/CategoriesButtons/CategoriesButtons';

export default function Products() {
  const { fetchFilters, fetchProducts, products, loading, longLoading, error } = useProductsStore();
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
        <FiltersProvider>
          <CategoriesButtons />
          <FiltersButton />
        </FiltersProvider>
      </div>
      <ProductsGrid products={products} loading={loading} error={error} />
    </section>
  );
}
