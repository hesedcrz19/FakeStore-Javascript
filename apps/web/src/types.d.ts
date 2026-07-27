interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  updatedAt: string;
  createdAt: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number;
  discount: number;
  discountPercentage: number;
  promotion: string | null;
  shippingCost: number;
  rating: number;
  description: string;
  category: Category;
  images: string[];
  updatedAt: string;
  createdAt: string;
}
