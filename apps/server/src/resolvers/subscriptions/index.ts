import type { Resolvers } from '@repo/types/schema';
import type { PubSub } from 'graphql-subscriptions';

type Options = {
    pubSub: PubSub;
};

export const Subscription = (globalOption: Options): Resolvers['Subscription'] => {
    return {
        deploymentCreated: {
            subscribe: async (_parent, _args) => {
                globalOption.pubSub.subscribe('DEPLOYMENT_CREATED', (payload) => {
                    console.log("subscribe New deployment created:", payload);
                    return payload;
                });

                return globalOption.pubSub.asyncIterableIterator(['DEPLOYMENT_CREATED']);
            },
        },
        deploymentUpdated: {
            subscribe: async (_parent, _args,) => {
                globalOption.pubSub.subscribe('DEPLOYMENT_UPDATED', (payload) => {
                    console.log("subscribe Deployment updated:", payload);
                    return payload;
                });
                return globalOption.pubSub.asyncIterableIterator(['DEPLOYMENT_UPDATED'])
            },
        },
        deploymentDeleted: {
            subscribe: async (_parent, _args,) => {
                globalOption.pubSub.subscribe('DEPLOYMENT_DELETED', (payload) => {
                    console.log("subscribe Deployment deleted:", payload);
                    return payload;
                });
                return globalOption.pubSub.asyncIterableIterator(['DEPLOYMENT_DELETED'])
            }
        },
        documentUpdated: {
            subscribe: async (_parent, _args,) => {
                globalOption.pubSub.subscribe('DOCUMENT_UPDATED', (payload) => {
                    console.log("subscribe Document updated:", payload);
                    return payload;
                });
                return globalOption.pubSub.asyncIterableIterator(['DOCUMENT_UPDATED'])
            }
        },
    }
};