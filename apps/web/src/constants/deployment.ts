import { DeploymentStatus } from "@repo/types/schema";

export const DEPLOYMENT_STATUS = [
  DeploymentStatus.Failed,
  DeploymentStatus.InProgress,
  DeploymentStatus.Pending,
  DeploymentStatus.Success,
];

export const HTTP_ENDPOINT = "http://localhost:3000/graphql/";
