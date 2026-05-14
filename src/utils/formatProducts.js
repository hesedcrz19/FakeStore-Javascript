import { formatPrice } from './formatPrice';
import { shortenText } from './shortenText';

export function formatProduct({
  id,
  title,
  slug,
  description,
  price,
  originalPrice,
  discountPercentage,
  shippingCost,
  promotion,
  images,
  category,
}) {
  const shortedDescription = shortenText(description, 80);
  const shortedTitle = shortenText(title, 50);
  const shortedCategory = shortenText(category?.name, 20);
  const shippingCostFormatted = {
    cost: formatPrice(shippingCost),
    text: shippingCost === 0 ? 'Free Shipping' : `Shipping cost: ${formatPrice(shippingCost)}`,
  };

  return {
    id,
    title: shortedTitle,
    slug,
    description: shortedDescription,
    price: formatPrice(Number(price)),
    originalPrice: formatPrice(Number(originalPrice)),
    discountPercentage,
    shippingCost: shippingCostFormatted,
    promotion: promotion,
    principalImage: images[0],
    images,
    category: {
      id: category?.id,
      name: shortedCategory,
      slug: category?.slug,
      image: category?.image,
    },
  };
}
