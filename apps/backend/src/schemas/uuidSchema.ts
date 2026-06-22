import z from 'zod';

export const uuidSchema = z.uuid('The id must be a valid UUID');
