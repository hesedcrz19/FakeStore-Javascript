import { createProduct, updateProduct } from './createProduct.js';
import { filterProducts } from './filterProducts.js';
import { titleAlreadyExistError, productNotFoundError } from '../utils/createError.js';
import { products } from '../data/products.js';
import type { ProductQuerySchema } from './schemas/productQuerySchema.js';
import type { CreateProduct, UpdateProduct } from './schemas/productSchema.js';

export class ProductModel {
  static async getAll(filters: ProductQuerySchema) {
    return filterProducts([...products], filters);
  }

  static async getById({ id }: { id: string }) {
    const product = products.find((product) => product.id === id);
    if (!product) throw productNotFoundError();
    return product;
  }

  static async getRelatedById({ id, filters }: { id: string; filters: ProductQuerySchema }) {
    const product = products.find((product) => product.id === id);
    if (!product) throw productNotFoundError();

    const relatedProducts = products.filter(
      (el) => el.category.id === product.category.id && el.id !== product.id
    );
    return filterProducts(relatedProducts, filters);
  }

  static async getBySlug({ slug }: { slug: string | undefined }) {
    const product = products.find((product) => product.slug === slug);
    if (!product) throw productNotFoundError();
    return product;
  }

  static async getRelatedBySlug({
    slug,
    filters,
  }: {
    slug: string | undefined;
    filters: ProductQuerySchema;
  }) {
    const product = products.find((product) => product.slug === slug);
    if (!product) throw productNotFoundError();
    const relatedProducts = products.filter(
      (el) => el.category.id === product.category.id && el.id !== product.id
    );
    return filterProducts(relatedProducts, filters);
  }

  static async create({ body }: { body: CreateProduct }) {
    const newProduct = createProduct(body);

    // Checking if the title already exist
    if (products.some((product) => product.slug === newProduct.slug)) titleAlreadyExistError();

    products.push(newProduct);
    return newProduct;
  }

  static async update({ id, body }: { id: string; body: UpdateProduct }) {
    // Verifying if the product exist
    const prevProductIndex = products.findIndex((product) => product.id === id);
    const prevProduct = products[prevProductIndex];
    if (!prevProduct) throw productNotFoundError();

    const newObject = {
      ...prevProduct,
      ...body,
    };
    const newProduct = updateProduct(newObject);

    // Verifying if the slug is unique
    if (products.find((product, i) => product.slug === newProduct.slug && i !== prevProductIndex))
      titleAlreadyExistError();

    products[prevProductIndex] = newProduct;
    return newProduct;
  }

  static async delete({ id }: { id: string }) {
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) throw productNotFoundError();

    products.splice(productIndex, 1);
  }
}
