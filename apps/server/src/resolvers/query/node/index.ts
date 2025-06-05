import DATA_BASE from '@/db';
import type { IResolvers } from 'mercurius';
import { match, P } from 'ts-pattern';

export const node: NonNullable<IResolvers['Query']>['node'] = ({ }, { id }) => {
    console.log('Resolving node with ID:', id);
    const result = match(id)
        .with(P.string.startsWith('deployment_'), (deploymentId) => {
            return DATA_BASE.data.deployments.find(deployment => deployment.id === deploymentId) ?? null;
        })
        .otherwise(() => {
            console.error('Invalid ID format:', id);
            return null;
        });

    return {
        __typename: 'Deployment',
        ...result
    };
}