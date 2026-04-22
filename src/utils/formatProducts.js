import { formatPrice } from './formatPrice';
import { shortenText } from './shortenText';

export function formatProduct({
  category,
  description,
  id,
  images,
  price,
  slug,
  title,
}) {
  const shortedDescription = shortenText(description, 80);
  const shortedCategory = shortenText(category?.name, 15);
  const shortedTitle = shortenText(title, 50);

  return {
    category: {
      id: category?.id,
      name: shortedCategory,
      slug: category?.slug,
      image: category?.image,
    },
    price: formatPrice(Number(price)),
    description: shortedDescription,
    principalImage: images[0],
    title: shortedTitle,
    id,
    slug,
    images,
  };
}
