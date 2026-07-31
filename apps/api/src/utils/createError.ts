import ERROR_CODES from '../const/errorCodes.js';

export class AppError extends Error {
  public status: number;
  public code: string;
  constructor(message: string, status: number, code: string) {
    super(message);
    this.status = status;
    this.code = code;
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
