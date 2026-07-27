import type { CreateProduct, UpdateProduct } from './schemas/productSchema.js';
import { categories } from '../data/categories.js';
import { categoryNotFoundError } from '../utils/createError.js';

export const updateProduct = (product: UpdateProduct): Product => {
  const {
    id,
    categoryId,
    title,
    description,
    originalPrice,
    discountPercentage,
    promotion,
    shippingCost,
    rating,
    images,
    category,
    createdAt,
  } = product;

  const discount = Math.round((originalPrice * discountPercentage) / 100);

  let newCategory: Category | undefined = undefined;
  if (categoryId) {
    newCategory = categories.find((category) => category.id === categoryId);
  }
  if (!newCategory) newCategory = category;

  return {
    id,
    title,
    slug: title.replace(/\s+/g, '-').toLowerCase(),
    description,
    price: Number((originalPrice - discount).toFixed(2)),
    originalPrice,
    discount,
    discountPercentage,
    promotion,
    shippingCost,
    rating,
    images,
    category: newCategory,
    updatedAt: new Date().toISOString(),
    createdAt,
  };
};
export const createProduct = (product: CreateProduct): Product => {
  const {
    title,
    description,
    originalPrice,
    discountPercentage,
    promotion,
    shippingCost,
    rating,
    images,
  } = product;

  const discount = Math.round((originalPrice * discountPercentage) / 100);
  const category = categories.find((category) => category.id === product.categoryId);

  if (!category) throw categoryNotFoundError();

  return {
    id: crypto.randomUUID(),
    title,
    slug: title.replace(/\s+/g, '-').toLowerCase(),
    description,
    price: Number((originalPrice - discount).toFixed(2)),
    originalPrice,
    discount,
    discountPercentage,
    promotion,
    shippingCost,
    rating,
    images,
    category,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
};
