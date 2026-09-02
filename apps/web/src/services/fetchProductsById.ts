import { PRODUCT_ID_API_URL } from '../consts/productApi';
import type { Product } from '@trending-market/shared';

export async function fetchProductById(id: string) {
  const res = await fetch(`${PRODUCT_ID_API_URL}/${id}`);
  console.log('start fetching...');
  if (!res.ok) throw new Error('Error fetching the product');
  return (await res.json()) as Product;
}
