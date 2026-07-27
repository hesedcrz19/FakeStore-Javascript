import { Router } from 'express';
import { validateBody, validatePartialBody } from '../middlewares/validateBody.js';
import { categorySchema } from './schemas/categorySchema.js';
import { CategoryController } from './category.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const categoriesRouter = Router();

categoriesRouter.get(
  '/',
  asyncHandler((req, res) => CategoryController.getAll(req, res))
);
categoriesRouter.get(
  '/:id',
  asyncHandler((req, res) => CategoryController.getById(req, res))
);
categoriesRouter.get(
  '/:id/products',
  asyncHandler((req, res) => CategoryController.getProductsByCategoryId(req, res))
);
categoriesRouter.get(
  '/slug/:slug',
  asyncHandler((req, res) => CategoryController.getBySlug(req, res))
);
categoriesRouter.get(
  '/slug/:slug/products',
  asyncHandler((req, res) => CategoryController.getProductsByCategorySlug(req, res))
);
categoriesRouter.post(
  '/',
  validateBody(categorySchema),
  asyncHandler((req, res) => CategoryController.create(req, res))
);
categoriesRouter.patch(
  '/:id',
  validatePartialBody(categorySchema),
  asyncHandler((req, res) => CategoryController.update(req, res))
);
categoriesRouter.put(
  '/:id',
  validateBody(categorySchema),
  asyncHandler((req, res) => CategoryController.update(req, res))
);
categoriesRouter.delete(
  '/:id',
  asyncHandler((req, res) => CategoryController.delete(req, res))
);
