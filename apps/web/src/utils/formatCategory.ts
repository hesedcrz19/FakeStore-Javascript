import type { FormattedCategory } from '@/types/formattedCategory';
import type { Category } from '@trending-store/shared';

export const formatCategory = (category: Category): FormattedCategory => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
  image: category.image,
});
