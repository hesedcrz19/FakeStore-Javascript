import ERROR_CODES from '../const/errorCodes.js';

export class AppError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
  }
}

export const createError = ({
  status,
  code,
  message,
}: {
  status: number;
  code: string;
  message: string;
}) => new AppError(message, status, code);

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
