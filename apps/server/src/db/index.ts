import { DeploymentStatus, type Deployment } from '@repo/types/schema';
import { JSONFilePreset } from 'lowdb/node';
import type { Low } from 'lowdb';


type Database = {
    document: {
        title: string;
        description: string;
    };
    deployments: Deployment[];
};

const defaultData: Database = {
    document: {
        title: '0.0.0 Deployment',
        description: 'Check the deployment status',
    },
    deployments: [
        {
            id: crypto.randomUUID(),
            name: 'Deployment 1',
            status: DeploymentStatus.Yet,
            deployer: 'deployer1',
            description: 'Check the deployment status',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: crypto.randomUUID(),
            name: 'Deployment 2',
            status: DeploymentStatus.Yet,
            deployer: 'deployer2',
            description: 'Check the deployment status',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ],
};

const DATA_BASE: Low<Database> = await JSONFilePreset('../../db.json', defaultData);

export default DATA_BASE;
