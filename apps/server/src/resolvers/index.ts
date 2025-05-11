
import type { Resolvers } from '@repo/types/schema';
import { Mutation } from '@/resolvers/mutations';
import { Query } from '@/resolvers/queries';
import { Subscription } from '@/resolvers/subscriptions';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

export const resolvers: Resolvers = {
    Query,
    Mutation: Mutation({ pubSub }),
    Subscription: Subscription({ pubSub }),
}