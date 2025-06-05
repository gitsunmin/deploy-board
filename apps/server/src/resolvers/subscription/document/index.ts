import type { IResolvers } from 'mercurius';


export const documentUpdated: NonNullable<IResolvers['Subscription']>['documentUpdated'] = {
    subscribe: async (_parent, _args, { pubsub }) => {
        console.log('🙏 Successfully subscribed to documentUpdated');
        return await pubsub.subscribe('DOCUMENT_UPDATED');
    }
};
