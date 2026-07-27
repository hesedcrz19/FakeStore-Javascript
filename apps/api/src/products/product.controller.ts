import { ProductModel } from './product.model.js';
import { productQuerySchema } from './schemas/productQuerySchema.js';
import { uuidSchema } from '../schemas/uuidSchema.js';
import z from 'zod';
import type { Request, Response } from 'express';
import type { CreateProduct, UpdateProduct } from './schemas/productSchema.js';

export class ProductController {
  static async getAll(req: Request, res: Response) {
    const products = await ProductModel.getAll(productQuerySchema.parse(req.query));
    res.json(products);
  }

  static async getById(req: Request, res: Response) {
    const product = await ProductModel.getById({
      id: uuidSchema.parse(req.params.id),
    });
    res.json(product);
  }

  static async getRelatedById(req: Request, res: Response) {
    const products = await ProductModel.getRelatedById({
      id: uuidSchema.parse(req.params.id),
      filters: productQuerySchema.parse(req.query),
    });
    res.json(products);
  }

  static async getBySlug(req: Request, res: Response) {
    const product = await ProductModel.getBySlug({ slug: req.params.slug?.toString() });
    res.json(product);
  }

  static async getRelatedBySlug(req: Request, res: Response) {
    const product = await ProductModel.getRelatedBySlug({
      slug: z.string().parse(req.params.slug),
      filters: productQuerySchema.parse(req.query),
    });
    res.json(product);
  }

  static async create(req: Request, res: Response) {
    const newProduct = await ProductModel.create({ body: req.body as CreateProduct });
    res.status(201).json(newProduct);
  }

  static async update(req: Request, res: Response) {
    const newProduct = await ProductModel.update({
      id: uuidSchema.parse(req.params.id),
      body: req.body as UpdateProduct,
    });
    res.json(newProduct);
  }

  static async delete(req: Request, res: Response) {
    await ProductModel.delete({ id: uuidSchema.parse(req.params.id) });
    res.status(204).send();
  }
}
