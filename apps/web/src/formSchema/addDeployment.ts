import { z } from 'zod';

export const addDeploymentFormSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  deployer: z.string().min(2).max(100),
});
