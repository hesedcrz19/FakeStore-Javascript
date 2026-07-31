import productsJson from '../json/products.json' with { type: 'json' };
import type { Product } from '@trending-store/shared/types';

export const products: Product[] = productsJson;
