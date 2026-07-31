import type { Category } from '@trending-store/shared';
import type { CreateCategory } from './schemas/categorySchema.js';

export const createCategory = ({ name, image }: CreateCategory): Category => ({
  id: crypto.randomUUID(),
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  image,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const updateCategory = ({ name, image, id, createdAt }: Category): Category => ({
  id,
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  image,
  createdAt,
  updatedAt: new Date().toISOString(),
});
