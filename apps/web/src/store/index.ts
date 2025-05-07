import { proxy } from 'valtio';
import type { Deployment } from '@repo/typescript-config/graphql';

export type RootStore = {
  deployments: Deployment[];
};

export const store = proxy<RootStore>({
  deployments: [],
});

export const setDeployments = (deployments: Deployment[]) => {
  store.deployments = deployments;
};
