
import type { Resolvers } from '@repo/typescript-config/graphql';
import { Mutation } from './mutations';
import { Query } from './queries';

export const resolvers: Resolvers = {
    Query,
    Mutation,
}