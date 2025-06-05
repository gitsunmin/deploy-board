import { Query } from '@/resolvers/query';
import type { IResolvers } from 'mercurius';
import { match, P } from 'ts-pattern';
import { Subscription } from '@/resolvers/subscription';
import { Mutation } from '@/resolvers/mutation';

export const resolvers: IResolvers = {
    Query,
    Mutation,
    Subscription,
    Node: {
        resolveType: ({ id }) => match(id)
            .with(P.string.startsWith('deployment_'), () => 'Deployment' as const)
            .otherwise(() => null),
    }
};