import { z } from 'zod';

export const updateDocumentFormSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().optional(),
});
