import { Router } from 'express';
import { ProductController } from './product.controller.js';
import { productSchema } from './schemas/productSchema.js';
import { validateBody, validatePartialBody } from '../middlewares/validateBody.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const productsRouter = Router();

productsRouter.get(
  '/',
  asyncHandler((req, res) => ProductController.getAll(req, res))
);
productsRouter.get(
  '/:id',
  asyncHandler((req, res) => ProductController.getById(req, res))
);
productsRouter.get(
  '/:id/related',
  asyncHandler((req, res) => ProductController.getRelatedById(req, res))
);
productsRouter.get(
  '/slug/:slug',
  asyncHandler((req, res) => ProductController.getBySlug(req, res))
);
productsRouter.get(
  '/slug/:slug/related',
  asyncHandler((req, res) => ProductController.getRelatedBySlug(req, res))
);
productsRouter.post(
  '/',
  validateBody(productSchema),
  asyncHandler((req, res) => ProductController.create(req, res))
);
productsRouter.patch(
  '/:id',
  validatePartialBody(productSchema),
  asyncHandler((req, res) => ProductController.update(req, res))
);
productsRouter.put(
  '/:id',
  validateBody(productSchema),
  asyncHandler((req, res) => ProductController.update(req, res))
);
productsRouter.delete(
  '/:id',
  asyncHandler((req, res) => ProductController.delete(req, res))
);
