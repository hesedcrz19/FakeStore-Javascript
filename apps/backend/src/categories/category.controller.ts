import { CategoryModel } from './category.model.js';
import { uuidSchema } from '../schemas/uuidSchema.js';
import { productQuerySchema } from '../products/schemas/productQuerySchema.js';
import type { Request, Response } from 'express';
import z from 'zod';

export class CategoryController {
  static async getAll(req: Request, res: Response) {
    const categories = await CategoryModel.getAll();
    res.json(categories);
  }

  static async getById(req: Request, res: Response) {
    const category = await CategoryModel.getById({
      id: uuidSchema.parse(req.params.id),
    });
    res.json(category);
  }

  static async getProductsByCategoryId(req: Request, res: Response) {
    const products = await CategoryModel.getProductsByCategoryId({
      id: uuidSchema.parse(req.params.id),
      filters: productQuerySchema.parse(req.query),
    });
    res.json(products);
  }

  static async getBySlug(req: Request, res: Response) {
    const category = await CategoryModel.getBySlug({ slug: z.string().parse(req.params.slug) });
    res.json(category);
  }

  static async getProductsByCategorySlug(req: Request, res: Response) {
    const products = await CategoryModel.getProductsByCategorySlug({
      slug: z.string().parse(req.params.slug),
      filters: productQuerySchema.parse(req.query),
    });
    res.json(products);
  }

  static async create(req: Request, res: Response) {
    const category = await CategoryModel.create({ body: req.body });
    res.status(201).json(category);
  }

  static async update(req: Request, res: Response) {
    const category = await CategoryModel.update({
      id: uuidSchema.parse(req.params.id),
      body: req.body,
    });
    res.status(201).json(category);
  }

  static async delete(req: Request, res: Response) {
    await CategoryModel.delete({
      id: uuidSchema.parse(req.params.id),
    });
    res.status(204).send();
  }
}
