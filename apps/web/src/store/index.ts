import type { Deployment } from '@/lib/database';
import { proxy } from 'valtio';

export type RootStore = {
  deployments: Deployment[];
};

export const store = proxy<RootStore>({
  deployments: [],
});

export const setDeployments = (deployments: Deployment[]) => {
  store.deployments = deployments;
};
