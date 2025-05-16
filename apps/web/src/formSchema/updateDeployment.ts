import { z } from 'zod';
import { DeploymentStatus } from "@repo/types/schema";

export const updateDeploymentFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  deployer: z.string().min(2).max(100),
  status: z.enum([DeploymentStatus.Yet, DeploymentStatus.Failed, DeploymentStatus.InProgress, DeploymentStatus.Pending, DeploymentStatus.Success]),
});
