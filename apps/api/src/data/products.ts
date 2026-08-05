import productsJson from '../json/products.json' with { type: 'json' };
import type { Product } from '@trending-market/shared/types';

export const products: Product[] = productsJson;
