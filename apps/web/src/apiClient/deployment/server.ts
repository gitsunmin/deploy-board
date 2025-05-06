import DATA_BASE, { type Deployment } from '@/lib/database';
import { match, P } from 'ts-pattern';

export async function getDeployments(): Promise<Deployment[]> {
  const { deployments } = DATA_BASE.data;
  return deployments;
}

export const getDeploymentsResponse = async () => {
  return match(DATA_BASE.data)
    .with(
      {
        deployments: P.array({
          id: P.string,
          name: P.string,
          status: P.union('PENDING', 'DEPLOYING', 'DEPLOYED', 'FAILED'),
          deployer: P.string,
          description: P.string,
          createdAt: P.string,
          updatedAt: P.union(P.string, P.nullish),
        }),
      },
      (data) => {
        return data.deployments;
      },
    )
    .otherwise(() => {
      throw new Error('Invalid data structure');
    });
};

export const addDeploymentResponse = async (
  deployment: Deployment,
): Promise<Deployment> => {
  return match(deployment)
    .with(
      {
        id: P.string,
        name: P.string,
        status: P.union('PENDING', 'DEPLOYING', 'DEPLOYED', 'FAILED'),
        deployer: P.string,
        description: P.string,
        createdAt: P.string,
        updatedAt: P.union(P.string, P.nullish),
      },
      (deployment) => {
        DATA_BASE.update(({ deployments }) => {
          deployments.push(deployment);
          DATA_BASE.write();
        });
        return Promise.resolve(deployment);
      },
    )
    .otherwise(() => {
      throw new Error('Invalid deployment data');
    });
};

export const updateDeploymentResponse = async (
  id: string,
  updatedData: Partial<Deployment>,
): Promise<Deployment | null> => {
  const { deployments } = DATA_BASE.data;
  const index = deployments.findIndex((deployment) => deployment.id === id);

  if (index === -1) {
    return null;
  }

  const updatedDeployment = { ...deployments[index], ...updatedData };
  deployments[index] = updatedDeployment;

  DATA_BASE.write();

  return updatedDeployment;
};

export const deleteDeploymentResponse = async (
  id: string,
): Promise<boolean> => {
  const { deployments } = DATA_BASE.data;
  const index = deployments.findIndex((deployment) => deployment.id === id);

  if (index === -1) {
    return false;
  }

  deployments.splice(index, 1);
  DATA_BASE.write();

  return true;
};
