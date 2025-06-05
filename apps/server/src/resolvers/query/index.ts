import { document } from '@/resolvers/query/document';
import { deployments } from '@/resolvers/query/deployments';
import { node } from '@/resolvers/query/node';
import type { IResolvers } from 'mercurius';

type QueryResolvers = NonNullable<IResolvers['Query']>;

export const Query: QueryResolvers = {
    document,
    deployments,
    node,
};