import { DEPLOYMENT_STATUS } from '@/constants/deployment';
import { z } from 'zod';

export const updateDeploymentFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  deployer: z.string().min(2).max(100),
  status: z.enum(DEPLOYMENT_STATUS),
});
