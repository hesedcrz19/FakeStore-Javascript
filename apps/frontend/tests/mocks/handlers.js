import { http, HttpResponse } from 'msw';
import { CATEGORIES_API_URL } from '@/consts/categoriesApi';
import { PRODUCT_API_URL } from '@/consts/productApi';

export const handlers = [
  http.get(CATEGORIES_API_URL, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Clothes',
        slug: 'clothes',
      },
      {
        id: 2,
        name: 'Shoes',
        slug: 'shoes',
      },
      {
        id: 3,
        name: 'Furniture',
        slug: 'furniture',
      },
    ]);
  }),
  http.get(`${PRODUCT_API_URL}/product1`, () => {
    return HttpResponse.json({
      id: 1,
      title: 'Product1',
      slug: 'product1',
      price: 10,
      images: ['img', 'img', 'img'],
    });
  }),
];
