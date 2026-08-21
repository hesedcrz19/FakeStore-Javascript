import { PRODUCTS_API_URL, PRODUCTS_API_FILTERS, PAGE_LENGTH } from '@/consts/productsApi';
import { FILTERS_KEYS } from '@/consts/filtersConsts';
import type { Filters } from '@/types/filtersTypes';
import { AppError, type ProductsResponse } from '@trending-market/shared';

export async function productsFetch(filters: Filters, page: number) {
  const url = new URL(PRODUCTS_API_URL);

  for (const filterKey of Object.values(FILTERS_KEYS)) {
    if (filters[filterKey]) {
      url.searchParams.append(PRODUCTS_API_FILTERS[filterKey], filters[filterKey]);
    }
  }

  page = isNaN(page) ? 1 : page;

  url.searchParams.append('offset', ((page - 1) * PAGE_LENGTH).toString());
  url.searchParams.append('limit', String(PAGE_LENGTH));

  const response = await fetch(url);
  if (!response.ok) {
    const error = (await response.json()) as AppError;
    throw new AppError(error);
  }
  return (await response.json()) as ProductsResponse;
}
