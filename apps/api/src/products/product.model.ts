import { createProduct, updateProduct } from './createProduct.js';
import { filterProducts } from './filterProducts.js';
import { titleAlreadyExistError, productNotFoundError } from '../utils/createError.js';
import { products } from '../data/products.js';
import type { ProductQuerySchema } from './schemas/productQuerySchema.js';
import type { CreateProduct, UpdateProduct } from './schemas/productSchema.js';
import { paginateProducts } from './paginateProducts.js';

export class ProductModel {
  ///////////////////// GET ALL PRODUCTS /////////////////////
  static async getAll(filters: ProductQuerySchema) {
    const filteredProducts = filterProducts([...products], filters);
    const [paginatedProducts, pagination] = paginateProducts(
      filteredProducts,
      filters.offset,
      filters.limit
    );
    return {
      pagination,
      data: paginatedProducts,
    };
  }

  ///////////////////// GET PRODUCT BY ID /////////////////////
  static async getById({ id }: { id: string }) {
    const product = products.find((product) => product.id === id);
    if (!product) throw productNotFoundError();
    return product;
  }

  ///////////////////// GET RELATED PRODUCTS BY ID /////////////////////
  static async getRelatedById({ id, filters }: { id: string; filters: ProductQuerySchema }) {
    const product = products.find((product) => product.id === id);
    if (!product) throw productNotFoundError();

    const relatedProducts = products.filter(
      (el) => el.category.id === product.category.id && el.id !== product.id
    );
    const filteredProducts = filterProducts(relatedProducts, filters);
    const [paginatedProducts, pagination] = paginateProducts(
      filteredProducts,
      filters.offset,
      filters.limit
    );
    return {
      pagination,
      data: paginatedProducts,
    };
  }

  ///////////////////// GET PRODUCT BY SLUG /////////////////////
  static async getBySlug({ slug }: { slug: string }) {
    const product = products.find((product) => product.slug === slug);
    if (!product) throw productNotFoundError();
    return product;
  }

  ///////////////////// GET RELATED PRODUCTS BY SLUG /////////////////////
  static async getRelatedBySlug({ slug, filters }: { slug: string; filters: ProductQuerySchema }) {
    const product = products.find((product) => product.slug === slug);
    if (!product) throw productNotFoundError();
    const relatedProducts = products.filter(
      (el) => el.category.id === product.category.id && el.id !== product.id
    );
    const filteredProducts = filterProducts(relatedProducts, filters);
    const [paginatedProducts, pagination] = paginateProducts(
      filteredProducts,
      filters.offset,
      filters.limit
    );
    return {
      pagination,
      data: paginatedProducts,
    };
  }

  ///////////////////// CREATE PRODUCT /////////////////////
  static async create({ body }: { body: CreateProduct }) {
    const newProduct = createProduct(body);

    // Checking if the title already exist
    if (products.some((product) => product.slug === newProduct.slug))
      throw titleAlreadyExistError();

    products.push(newProduct);
    return newProduct;
  }

  ///////////////////// UPDATE PRODUCT /////////////////////
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
      throw titleAlreadyExistError();

    products[prevProductIndex] = newProduct;
    return newProduct;
  }

  ///////////////////// DELETE PRODUCT /////////////////////
  static async delete({ id }: { id: string }) {
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) throw productNotFoundError();

    products.splice(productIndex, 1);
  }
}
