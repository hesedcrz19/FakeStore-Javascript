import styles from './ProductsGrid.module.css';

import { useEffect } from 'react';
import { useRouter } from '@/hooks/useRoute.js';

import { useProductsStore } from '@/stores/productsStore.js';
import { formatProduct } from '@/utils/formatProducts.js';
import { setFiltersByParams } from '@/utils/setFiltersByParams.js';
import { areSameObjects } from '@/utils/areSameObject.js';

import { ProductCard } from '@/components/ProductCard/ProductCard.jsx';
import { NotFound } from '@/components/NotFound/NotFound.jsx';

export function ProductsGrid() {
  const { products, loading, fetchFilters, setFetchFilters, fetchProducts } =
    useProductsStore();
  const { searchParams } = useRouter();

  useEffect(() => {
    const filters = setFiltersByParams(searchParams);
    if (areSameObjects(fetchFilters, filters)) return;

    setFetchFilters(filters);
    fetchProducts(filters);
  }, [searchParams, fetchFilters, setFetchFilters, fetchProducts]);

  if (!products?.length && !loading) return <NotFound />;

  return (
    <section className={styles.productsGrid}>
      {<ProductsCards products={products} loading={loading} />}
    </section>
  );
}

function ProductsCards({ products, loading }) {
  if (loading)
    return Array.from({ length: 10 }).map((_, i) => {
      return <ProductCard key={i} loading={loading} />;
    });

  return products?.map((product) => {
    const formattedProduct = formatProduct(product || {});
    return (
      <ProductCard
        key={formattedProduct.id}
        formattedProduct={formattedProduct}
      />
    );
  });
}
