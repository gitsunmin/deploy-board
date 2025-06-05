// import { type Deployment } from '@repo/types/schema';
import { JSONFilePreset } from 'lowdb/node';
import type { Low } from 'lowdb';
import type { Deployment, Document } from '@repo/graphql/generated';


type Database = {
    document: Document;
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
