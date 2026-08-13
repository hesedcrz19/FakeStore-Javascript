import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '@trending-market/shared';

export const errorMiddleware = (
  err: ZodError | AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    const response: AppError = new AppError({
      message: 'Type error',
      status: 400,
      code: 'type_error',
      issues: err.issues,
    });
    return res.status(400).json(response);
  }

  if (err instanceof AppError) {
    return res.status(err.status || 500).json({
      message: err.message,
      status: err.status,
      code: err.code,
    });
  }

  res
    .status(500)
    .json(new AppError({ message: 'Internal error', status: 500, code: 'internal_error' }));
};
