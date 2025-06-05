import type { IResolvers } from 'mercurius';
import { deploymentCreated, deploymentDeleted, deploymentUpdated } from '@/resolvers/subscription/deployment';
import { documentUpdated } from '@/resolvers/subscription/document';


export const Subscription: IResolvers['Subscription'] = {
    deploymentCreated,
    deploymentUpdated,
    deploymentDeleted,
    documentUpdated
};