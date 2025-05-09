
import type { Resolvers } from '@repo/types/schema';
import { Mutation } from '@/resolvers/mutations';
import { Query } from '@/resolvers/queries';

export const resolvers: Resolvers = {
    Query,
    Mutation,
}