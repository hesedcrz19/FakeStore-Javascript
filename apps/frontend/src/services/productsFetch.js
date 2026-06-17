import { PRODUCTS_API_URL, PRODUCTS_API_FILTERS } from '@/consts/productsApi';
import { FILTERS_KEYS, FILTERS_DEFAULT_VALUES } from '@/consts/filtersConsts';

export async function productsFetch(filters = {}) {
  const url = new URL(PRODUCTS_API_URL);

  for (const filter in filters) {
    if (!Object.values(FILTERS_KEYS).includes(filter)) {
      throw new Error(`The filter ${filter} is not valid`);
    }
    if (filters[filter] !== FILTERS_DEFAULT_VALUES[filter]) {
      url.searchParams.append(PRODUCTS_API_FILTERS[filter], filters[filter]);
    }
  }

  console.log(url);

  const data = await fetch(url);
  if (!data.ok) throw new Error('A error ocurre fetching the products');
  return await data.json();
}
