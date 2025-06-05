import type { IResolvers } from 'mercurius';


export const deploymentCreated: NonNullable<IResolvers['Subscription']>['deploymentCreated'] = {
    subscribe: async (_parent, _args, { pubsub }) => {
        return await pubsub.subscribe('DEPLOYMENT_CREATED');
    }
};

export const deploymentUpdated: NonNullable<IResolvers['Subscription']>['deploymentUpdated'] = {
    subscribe: async (_parent, _args, { pubsub }) => {
        return await pubsub.subscribe('DEPLOYMENT_UPDATED');
    }
};

export const deploymentDeleted: NonNullable<IResolvers['Subscription']>['deploymentDeleted'] = {
    subscribe: async (_parent, _args, { pubsub }) => {
        return await pubsub.subscribe('DEPLOYMENT_DELETED');
    }
};
