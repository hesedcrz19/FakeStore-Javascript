import { Product } from '@trending-market/shared';
import {
  SORT_OPTIONS,
  SORT_ORDER_OPTIONS,
  SORT_ORDER_OPTIONS_DEFAULT,
  SORT_OPTIONS_DEFAULT,
} from './consts.js';
import type { ProductQuerySchema } from './schemas/productQuerySchema.js';

export const filterProducts = (products: Product[], filters: ProductQuerySchema) => {
  const {
    title,
    price,
    min_price,
    max_price,
    category_slug,
    category_id,
    sort_by = SORT_OPTIONS_DEFAULT,
    sort_order = SORT_ORDER_OPTIONS_DEFAULT,
    discount_percentage,
    min_discount_percentage,
    max_discount_percentage,
    has_discount,
    has_promotion,
    free_shipping,
  } = filters;
  if (title) {
    products = products.filter((product) => product.title.toLowerCase().includes(title));
  }

  if (price) {
    products = products.filter((product) => product.price === price);
  }

  if (min_price && !price) {
    products = products.filter((product) => product.price >= min_price);
  }

  if (max_price && !price) {
    products = products.filter((product) => product.price <= max_price);
  }

  if (category_id) {
    products = products.filter((product) => product.category.id === category_id);
  }

  if (category_slug && !category_id) {
    products = products.filter((product) => product.category.slug === category_slug);
  }

  if (discount_percentage) {
    products = products.filter((product) => product.discountPercentage === discount_percentage);
  }

  if (min_discount_percentage) {
    products = products.filter((product) => product.discountPercentage >= min_discount_percentage);
  }

  if (max_discount_percentage) {
    products = products.filter((product) => product.discountPercentage <= max_discount_percentage);
  }

  if (has_discount !== undefined) {
    products = products.filter((product) =>
      has_discount ? product.discountPercentage > 0 : product.discountPercentage === 0
    );
  }

  if (free_shipping !== undefined) {
    products = products.filter((product) =>
      free_shipping ? product.shippingCost === 0 : product.shippingCost > 0
    );
  }

  if (has_promotion !== undefined) {
    products = products.filter((product) =>
      has_promotion ? product.promotion : !product.promotion
    );
  }

  // Sorting
  if (sort_by === SORT_OPTIONS.PRICE) {
    products = products.sort((a, b) => b.price - a.price);
  } else if (sort_by === SORT_OPTIONS.TITLE) {
    products = products.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort_by === SORT_OPTIONS.RATING) {
    products = products.sort((a, b) => b.rating - a.rating);
  } else if (sort_by === SORT_OPTIONS.NEWEST) {
    products = products.sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      return 0;
    });
  }

  if (sort_order === SORT_ORDER_OPTIONS.ASC) {
    products = products.reverse();
  }

  return products;
};
