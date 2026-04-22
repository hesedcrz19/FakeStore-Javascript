import styles from './Products.module.css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FILTERS_KEYS, FILTERS_DEFAULT_VALUES } from '@/const.js';

import { useProductsStore } from '@/stores/productsStore';

import { ProductsGrid } from '@/Layouts/ProductsGrid/ProductsGrid.jsx';
import { FiltersProvider } from '@/context/FiltersContext';
import { FiltersButton } from '@/components/FiltersButton/FiltersButton';

export default function Products() {
  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsHeader}>
        <ProductsCounter />
        <FiltersProvider>
          <FiltersButton />
        </FiltersProvider>
      </div>
      <ProductsGrid />
    </div>
  );
}

function ProductsCounter() {
  const { productsLength, loading, error, fetchFilters } = useProductsStore();

  const category =
    fetchFilters.category === FILTERS_DEFAULT_VALUES[FILTERS_KEYS.CATEGORY]
      ? 'Products'
      : fetchFilters.category;

  const categoryCapitalize = error
    ? ''
    : category?.charAt(0).toUpperCase() + category?.slice(1);

  let content;

  if (loading) {
    content = undefined;
  } else if (error) {
    content = '';
  } else {
    content = `${categoryCapitalize} (${productsLength()})`;
  }

  return <h2>{content || <Skeleton width={170} />}</h2>;
}
