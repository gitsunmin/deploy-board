import type { DEPLOYMENT_STATUS } from '@/constants/deployment';
import { JSONFilePreset } from 'lowdb/node';

export type DeploymentStatus = (typeof DEPLOYMENT_STATUS)[number];

export const DeploymentStatusLabelMap: Record<DeploymentStatus, string> = {
  PENDING: '대기중 🧘🏻',
  DEPLOYING: '배포중 🔄',
  DEPLOYED: '배포완료 🌱',
  FAILED: '배포실패 ⛔️',
};

export type Deployment = {
  id: string;
  name: string;
  status: DeploymentStatus;
  deployer: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
};

type Database = {
  deployments: Deployment[];
};

const defaultData: Database = {
  deployments: [
    {
      id: '1',
      name: '배포 항목 1',
      status: 'PENDING',
      deployer: 'deployer1',
      description: '첫 번째 배포 항목',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: '배포 항목 2',
      status: 'DEPLOYING',
      deployer: 'deployer2',
      description: '두 번째 배포 항목',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

const DATA_BASE = await JSONFilePreset('db.json', defaultData);
export default DATA_BASE;
