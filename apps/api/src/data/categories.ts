import type { Category } from '@trending-market/shared';
import categoriesJson from '../json/categories.json' with { type: 'json' };

export const categories: Category[] = categoriesJson;
