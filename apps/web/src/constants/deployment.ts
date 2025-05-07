import { DeploymentStatus } from "@repo/typescript-config/graphql";

export const DEPLOYMENT_STATUS = [
  DeploymentStatus.Failed,
  DeploymentStatus.InProgress,
  DeploymentStatus.Pending,
  DeploymentStatus.Success,
];

export const HTTP_ENDPOINT = "http://localhost:3000/graphql/";
