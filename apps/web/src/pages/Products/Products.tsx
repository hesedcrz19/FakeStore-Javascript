import styles from './Products.module.css';
import { useProductsStore } from '@/stores/productsStore';
import { useEffect } from 'react';
import { setFiltersByParams } from '@/utils/setFiltersByParams';
import { ProductsGrid } from '@/components/layouts/ProductsGrid/ProductsGrid';
import { FiltersProvider } from '@/context/FiltersContext';
import { FiltersButton } from '@/components/dialogs/FiltersButton/FiltersButton';
import { useSearchParams } from 'react-router';
import { LoadingDialog } from '@/components/loading/LoadingDialog/LoadingDialog';
import { CategoriesButtons } from '@/components/categories/CategoriesButtons/CategoriesButtons';
import { ProductsPagination } from '@/components/products/ProductsPagination/ProductsPagination';
import { PAGE } from '@/consts/filtersConsts';

export default function Products() {
  const { fetchProducts, products, loading, longLoading, error } = useProductsStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    void fetchProducts(setFiltersByParams(searchParams), Number(searchParams.get(PAGE)));
  }, [searchParams, fetchProducts]);

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
      <ProductsPagination />
    </section>
  );
}
