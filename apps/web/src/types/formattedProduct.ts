import type { ShorterText } from '@/utils/shortenText';

export interface FormattedProduct {
  id: string;
  title: ShorterText;
  slug: string;
  description: ShorterText;
  price: string;
  originalPrice: string;
  discountPercentage: number;
  shippingCost: { cost: string; text: string };
  promotion: string | null;
  principalImage: string | null;
  images: string[];
  category: {
    id: string;
    name: ShorterText;
    slug: string;
    image: string;
  };
}
