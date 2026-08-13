import { z } from 'zod';

export class AppError extends Error {
  public status: number;
  public code: string;
  public issues?: z.core.$ZodIssue[];
  constructor({
    message,
    status,
    code,
    issues,
  }: {
    message: string;
    status: number;
    code: string;
    issues?: z.core.$ZodIssue[];
  }) {
    super(message);
    this.message = message;
    this.status = status;
    this.code = code;
    this.issues = issues;
  }
}
