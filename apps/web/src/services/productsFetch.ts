import { PRODUCTS_API_URL, PRODUCTS_API_FILTERS } from '@/consts/productsApi';
import { FILTERS_KEYS, FILTERS_DEFAULT_VALUES } from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';
import type { Product } from '@trending-store/shared';

export async function productsFetch(filters: Filters) {
  const url = new URL(PRODUCTS_API_URL);

  for (const filterKey of Object.values(FILTERS_KEYS)) {
    if (filters[filterKey] !== FILTERS_DEFAULT_VALUES[filterKey]) {
      url.searchParams.append(PRODUCTS_API_FILTERS[filterKey], filters[filterKey]);
    }
  }

  console.log(url);

  const data = await fetch(url);
  if (!data.ok) throw new Error('A error ocurre fetching the products');
  return (await data.json()) as Promise<Product[]>;
}
