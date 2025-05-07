
import type { Resolvers } from '@repo/types/schema';
import { Mutation } from './mutations';
import { Query } from './queries';

export const resolvers: Resolvers = {
    Query,
    Mutation,
}