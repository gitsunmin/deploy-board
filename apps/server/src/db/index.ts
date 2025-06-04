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
    ],
};

const DATA_BASE: Low<Database> = await JSONFilePreset('../../db.json', defaultData);

export default DATA_BASE;
