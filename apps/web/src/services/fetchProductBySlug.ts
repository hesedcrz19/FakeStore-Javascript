import { PRODUCT_SLUG_API_URL } from '../consts/productApi';
import type { Product } from '@trending-market/shared';

export async function fetchProductBySlug(slug?: string) {
  const res = await fetch(`${PRODUCT_SLUG_API_URL}/${slug}`);
  if (!res.ok) throw new Error('Error fetching the product');
  return (await res.json()) as Product;
}
