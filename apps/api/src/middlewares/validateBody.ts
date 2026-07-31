import type { Request, Response, NextFunction } from 'express';
import type { ZodObject, ZodType } from 'zod';
import type z from 'zod';

export function validateBody<T extends ZodObject<Record<string, ZodType>>>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validation = schema.parse(req.body);
      req.body = validation;
      next();
    } catch (e) {
      next(e);
    }
  };
}
export function validatePartialBody<T extends z.ZodObject<Record<string, ZodType>>>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validation = schema.partial().parse(req.body);
      req.body = validation;
      next();
    } catch (e) {
      next(e);
    }
  };
}
