import { CATEGORIES_API_URL } from '../consts/categoriesApi';

export async function categoriesFetch() {
  const data = await fetch(CATEGORIES_API_URL);
  if (!data.ok) throw new Error('A error ocurre fetching the categories');
  return (await data.json()) as Category[];
}
