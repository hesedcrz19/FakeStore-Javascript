import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import styles from './CategoriesButtons.module.css';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { FILTERS_KEYS } from '@/consts/filtersConsts';
import { CategoryLink } from '../CategoryLink/CategoryLink';
import { AllProductsLink } from '../../products/AllProductsLink/AllProductsLink';
import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

export function CategoriesButtons() {
  const categories = useCategoriesStore((store) => store.categories);
  const loading = useCategoriesStore((store) => store.loading);
  const [searchParams] = useSearchParams();

  const categoriesFilters = useMemo(
    () => [...categories].filter((cat) => cat.slug !== searchParams.get(FILTERS_KEYS.CATEGORY)),
    [categories, searchParams]
  );
  const categorySelected = useMemo(
    () => [...categories].find((cat) => cat.slug === searchParams.get(FILTERS_KEYS.CATEGORY)),
    [categories, searchParams]
  );

  if (loading)
    return (
      <nav className={styles.nav}>
        <ul>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} width={110} height={30} borderRadius={15} />
            ))}
        </ul>
      </nav>
    );

  return (
    <nav className={styles.nav}>
      <ul>
        {categorySelected && (
          <li>
            <CategoryLink
              className={styles.active}
              to={{
                pathname: '/products',
                search: `?${FILTERS_KEYS.CATEGORY}=${categorySelected.slug}`,
              }}
            >
              {categorySelected.name}
            </CategoryLink>
          </li>
        )}
        <li>
          <AllProductsLink className={styles.active}>All</AllProductsLink>
        </li>
        {categoriesFilters.map(({ id, name, slug }) => {
          return (
            <li key={id}>
              <CategoryLink
                to={{ pathname: '/products', search: `?${FILTERS_KEYS.CATEGORY}=${slug}` }}
                className={styles.active}
              >
                {name}
              </CategoryLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
