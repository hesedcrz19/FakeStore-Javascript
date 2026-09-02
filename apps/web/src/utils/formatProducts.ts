import { formatPrice } from './formatPrice';
import { shortenText } from './shortenText';
import type { FormattedProduct } from '@/types/formattedProduct';
import type { Product } from '@trending-market/shared';

export function formatProduct({
  id,
  title = '',
  slug = '',
  description = '',
  price = 0,
  originalPrice = price,
  discountPercentage = 0,
  shippingCost = 0,
  promotion = null,
  images,
  category,
  rating,
}: Product): FormattedProduct {
  const shortedDescription = shortenText(description, 80);
  const shortedTitle = shortenText(title, 50);
  const shortedCategory = shortenText(category.name ?? '', 20);
  const shippingCostFormatted = {
    cost: formatPrice(shippingCost),
    text: shippingCost === 0 ? 'Free Shipping' : `Shipping cost: ${formatPrice(shippingCost)}`,
  };

  return {
    id,
    title: shortedTitle,
    slug,
    description: shortedDescription,
    numericPrice: price,
    price: formatPrice(Number(price)),
    originalPrice: formatPrice(Number(originalPrice)),
    discountPercentage,
    shippingCost: shippingCostFormatted,
    promotion: promotion,
    principalImage: images[0] ?? null,
    images: images,
    category: {
      id: category.id,
      name: shortedCategory,
      slug: category.slug ?? '',
      image: category.image ?? '',
    },
    rating,
  };
}
