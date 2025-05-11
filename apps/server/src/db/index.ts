import { DeploymentStatus, type Deployment } from '@repo/types/schema';
import { JSONFilePreset } from 'lowdb/node';
import type { Low } from 'lowdb';


export const DeploymentStatusLabelMap: Record<DeploymentStatus, string> = {
    PENDING: '대기중 🧘🏻',
    IN_PROGRESS: '배포중 🔄',
    SUCCESS: '배포완료 🌱',
    FAILED: '배포실패 ⛔️',
};

type Database = {
    document: {
        title: string;
        description: string;
    };
    deployments: Deployment[];
};

const defaultData: Database = {
    document: {
        title: '오늘의 배포',
        description: '오늘의 배포를 확인하세요.',
    },
    deployments: [
        {
            id: crypto.randomUUID(),
            name: '배포 항목 1',
            status: DeploymentStatus.Pending,
            deployer: 'deployer1',
            description: '첫 번째 배포 항목',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: crypto.randomUUID(),
            name: '배포 항목 2',
            status: DeploymentStatus.Pending,
            deployer: 'deployer2',
            description: '두 번째 배포 항목',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ],
};

const DATA_BASE: Low<Database> = await JSONFilePreset('../../db.json', defaultData);

export default DATA_BASE;
