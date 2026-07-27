import z from 'zod';

export const categorySchema = z.object(
  {
    name: z
      .string('The name must be a string')
      .trim()
      .refine((val) => !/\s{2,}/.test(val), {
        error: 'The name must not contain consecutive spaces',
      })
      .min(1, 'The name must have at least 1 characters'),
    image: z.string('The image must be a string').url('Image must be a valid URL'),
  },
  'The category must be an object'
);

export type CreateCategory = z.infer<typeof categorySchema>;
