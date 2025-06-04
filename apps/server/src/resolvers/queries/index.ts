import DATA_BASE from '@/db';
import type { Resolvers } from '@repo/types/schema';
import { match, P } from 'ts-pattern';

export const Query: Resolvers['Query'] = {
    node: (_parent, args) => {
        console.log('Fetching node with arguments:', args);

        try {
            const { id } = args;
            return match(id)
                .with(P.string.startsWith('deployment_'), (deploymentId) => {
                    console.log('Fetching deployment with ID:', deploymentId);
                    return DATA_BASE.data.deployments.find(
                        (d: any) => d.id === deploymentId
                    ) ?? null;
                })
                .otherwise(() => null);
        } catch (error) {
            console.error('Error fetching node:', error);
            return null;
        }
    },
    deployments: () => {
        try {
            return DATA_BASE.data.deployments;
        } catch (error) {
            console.error('Error fetching deployments:', error);
            return [];
        }
    },
    document: () => {
        try {
            console.log('Fetching document:', DATA_BASE.data.document);
            return DATA_BASE.data.document;
        } catch (error) {
            console.error('Error fetching document:', error);
            return {
                title: '',
                description: '',
            };
        }
    }

};

// Node 인터페이스의 resolveType 함수 추가
export const Node: Resolvers['Node'] = {
    __resolveType({ id }) {
        // ID를 기반으로 타입 결정
        return match(id)
            .with(P.string.startsWith('deployment_'), () => 'Deployment' as const)
            .otherwise(() => null);
    }
};