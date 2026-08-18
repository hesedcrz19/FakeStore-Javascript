import { PRODUCTS_API_URL, PRODUCTS_API_FILTERS } from '@/consts/productsApi';
import { FILTERS_KEYS } from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';
import { AppError, type Product } from '@trending-market/shared';

export async function productsFetch(filters: Filters) {
  const url = new URL(PRODUCTS_API_URL);

  for (const filterKey of Object.values(FILTERS_KEYS)) {
    if (filters[filterKey]) {
      url.searchParams.append(PRODUCTS_API_FILTERS[filterKey], filters[filterKey]);
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    const error = (await response.json()) as AppError;
    throw new AppError(error);
  }
  return (await response.json()) as Product[];
}
