import z from 'zod';
import { SORT_OPTIONS, SORT_ORDER_OPTIONS } from '../consts.js';

export const productQuerySchema = z.object({
  title: z.string('The title must be a string').toLowerCase().optional(),
  price: z.coerce
    .number('The price must be a number')
    .positive('The price must be positive')
    .transform((val) => Number(val.toFixed(2)))
    .optional()
    .catch(undefined),
  min_price: z.coerce
    .number('The min price must be a number')
    .positive('The min price must be positive')
    .transform((val) => Number(val.toFixed(2)))
    .optional()
    .catch(undefined),
  max_price: z.coerce
    .number('The max price must be a number')
    .positive('The max price must be positive')
    .transform((val) => Number(val.toFixed(2)))
    .optional()
    .catch(undefined),
  category_id: z.uuid('The category id must be a valid UUID').optional(),
  category_slug: z
    .string('The category slug must be a string')
    .regex(/^[a-z0-9-]+$/, 'The category slug must be a valid slug')
    .optional()
    .catch(undefined),
  sort_by: z
    .enum(Object.values(SORT_OPTIONS), {
      error: 'The sort by must be either "price", "title", "rating", or "newest"',
    })
    .optional()
    .catch(undefined),
  sort_order: z
    .enum([SORT_ORDER_OPTIONS.ASC, SORT_ORDER_OPTIONS.DESC], {
      error: 'The sort order must be either "asc" or "desc"',
    })
    .optional()
    .catch(undefined),
  discount_percentage: z.coerce
    .number('The discount percentage must be a number')
    .min(0, 'The discount percentage must be at least 0')
    .max(100, 'The discount percentage must be at most 100')
    .transform((val) => Number(val.toFixed(2)))
    .optional()
    .catch(undefined),
  min_discount_percentage: z.coerce
    .number('The min discount percentage must be a number')
    .min(0, 'The min discount percentage must be at least 0')
    .max(100, 'The min discount percentage must be at most 100')
    .transform((val) => Number(val.toFixed(2)))
    .optional()
    .catch(undefined),
  max_discount_percentage: z.coerce
    .number('The max discount percentage must be a number')
    .min(0, 'The max discount percentage must be at least 0')
    .max(100, 'The max discount percentage must be at most 100')
    .transform((val) => Number(val.toFixed(2)))
    .optional()
    .catch(undefined),
  has_discount: z
    .enum(['true', 'false'], { error: 'The has discount must be either "true" or "false"' })
    .transform((val) => val === 'true')
    .optional()
    .catch(undefined),
  has_promotion: z
    .enum(['true', 'false'], { error: 'The has promotion must be either "true" or "false"' })
    .transform((val) => val === 'true')
    .optional()
    .catch(undefined),
  free_shipping: z
    .enum(['true', 'false'], { error: 'The free shipping must be either "true" or "false"' })
    .transform((val) => val === 'true')
    .optional()
    .catch(undefined),
  limit: z.coerce
    .number('The limit must be a number')
    .positive('The limit must be positive')
    .int('The limit must be an integer')
    .optional()
    .catch(undefined),
  offset: z.coerce
    .number('The offset must be a number')
    .nonnegative('The offset must be non-negative')
    .int('The offset must be an integer')
    .optional()
    .catch(undefined),
});

export type ProductQuerySchema = z.infer<typeof productQuerySchema>;
