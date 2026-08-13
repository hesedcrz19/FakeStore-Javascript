import ERROR_CODES from '../const/errorCodes.js';
import { AppError } from '@trending-market/shared';

export const createError = ({
  status,
  code,
  message,
}: {
  status: number;
  code: string;
  message: string;
}) => new AppError({ message, status, code });

export const categoryNotFoundError = () =>
  createError({
    status: 404,
    code: ERROR_CODES.CATEGORY_NOT_FOUND,
    message: 'The category was not found',
  });

export const categoryNameExistsError = () =>
  createError({
    code: ERROR_CODES.NAME_ALREADY_EXIST,
    message: 'The category name already exists',
    status: 400,
  });

export const titleAlreadyExistError = () =>
  createError({
    code: ERROR_CODES.TITLE_ALREADY_EXIST,
    message: 'The product title already exist',
    status: 400,
  });

export const productNotFoundError = () =>
  createError({
    code: ERROR_CODES.PRODUCT_NOT_FOUND,
    message: 'Product not found',
    status: 404,
  });

export const error404 = () =>
  createError({
    code: ERROR_CODES.ERROR_404,
    message: 'Error 404',
    status: 404,
  });
