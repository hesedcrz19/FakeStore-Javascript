import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/createError.js';

export const errorMiddleware = (
  err: ZodError | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'type_error',
        message: 'Type error',
        errors: err.issues,
      },
    });
  }

  res.status(err.status || 500).json({
    error: {
      code: err.code || 'internal_error',
      message: err.message || 'Internal error',
    },
  });
};
