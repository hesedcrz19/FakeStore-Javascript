import { Product, ProductsResponse } from '@trending-market/shared';

export const paginateProducts = (
  products: Product[],
  offset = 0,
  limit = products.length
): [Product[], ProductsResponse['pagination']] => {
  const productsLength = products.length;
  products = products.slice(offset, offset + limit);

  return [
    products,
    {
      page: Math.ceil(offset / limit) + 1,
      totalPages: Math.ceil(productsLength / limit),
      limit: limit,
      totalItems: productsLength,
      hasNextPage: offset + limit < productsLength,
      hasPreviousPage: offset > 0,
    },
  ];
};
