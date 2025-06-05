import type { IResolvers } from 'mercurius';
import { updateDocument } from '@/resolvers/mutation/document';
import { createDeployment, deleteDeployment, updateDeployment } from '@/resolvers/mutation/deployment';

type MutationResolvers = NonNullable<IResolvers['Mutation']>;

export const Mutation: MutationResolvers = {
    updateDocument,
    createDeployment,
    deleteDeployment,
    updateDeployment
};