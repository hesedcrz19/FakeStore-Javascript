import { PRODUCT_API_URL } from '../consts/productApi';

export async function productFetch(slug?: string) {
  const res = await fetch(`${PRODUCT_API_URL}/${slug}`);
  if (!res.ok) throw new Error('Error fetching the product');
  return (await res.json()) as Product;
}
