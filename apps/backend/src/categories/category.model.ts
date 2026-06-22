import ERROR_CODES from '../const/errorCodes.js';
import {
  categoryNameExistsError,
  categoryNotFoundError,
  createError,
} from '../utils/createError.js';
import { createCategory, updateCategory } from './createCategory.js';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import { filterProducts } from '../products/filterProducts.js';
import type { ProductQuerySchema } from '../products/schemas/productQuerySchema.js';
import type { CreateCategory } from './schemas/categorySchema.js';

export class CategoryModel {
  static async getAll() {
    return categories;
  }

  static async getById({ id }: { id: string }) {
    const category = categories.find((category) => category.id === id);
    if (!category) throw categoryNotFoundError();

    return category;
  }

  static async getProductsByCategoryId({
    id,
    filters,
  }: {
    id: string;
    filters: ProductQuerySchema;
  }) {
    const category = categories.find((category) => category.id === id);
    if (!category) throw categoryNotFoundError();

    const newProducts = products.filter((product) => product.category.id === id);
    const productsFilter = filterProducts(newProducts, filters);
    return productsFilter;
  }

  static async getBySlug({ slug }: { slug: string }) {
    const category = categories.find((category) => category.slug === slug);
    if (!category) throw categoryNotFoundError();
    return category;
  }

  static async getProductsByCategorySlug({
    slug,
    filters,
  }: {
    slug: string;
    filters: ProductQuerySchema;
  }) {
    const category = categories.find((category) => category.slug === slug);
    if (!category) throw categoryNotFoundError();

    const newProducts = products.filter((product) => product.category.slug === slug);
    const productsFilter = filterProducts(newProducts, filters);
    return productsFilter;
  }

  static async create({ body }: { body: CreateCategory }) {
    const newCategory = createCategory(body);

    if (categories.some((cat) => cat.slug === newCategory.slug)) throw categoryNameExistsError();

    categories.push(newCategory);
    return newCategory;
  }

  static async update({ id, body }: { id: string; body: CreateCategory }) {
    // Verifying if the category exist
    const prevCategoryIndex = categories.findIndex((category) => category.id === id);
    const previousCategory = categories[prevCategoryIndex];
    if (!previousCategory) throw categoryNotFoundError();

    const newObject = {
      ...previousCategory,
      ...body,
    };
    const newCategory = updateCategory(newObject);

    // Verifying if the slug is unique
    if (
      categories.find(
        (category, i) => category.slug === newCategory.slug && i !== prevCategoryIndex
      )
    )
      throw categoryNameExistsError();

    // Changing the category
    categories[prevCategoryIndex] = newCategory;

    // Changing the products with the category
    for (const product of products) {
      if (product.category.id === id) {
        product.category = newCategory;
      }
    }
    return newCategory;
  }

  static async delete({ id }: { id: string }) {
    const categoryIndex = categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) throw categoryNotFoundError();

    // Deleting the category
    categories.splice(categoryIndex, 1);

    // Deleting the products with the category
    products.forEach((product, i) => {
      if (product.category.id === id) {
        products.splice(i, 1);
      }
    });
  }
}
