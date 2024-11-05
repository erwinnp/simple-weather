import { z } from 'zod';

export const searchInputSchema = z.object({
  city: z.string().min(1, { message: 'Must have at least 1 character' }),
});
