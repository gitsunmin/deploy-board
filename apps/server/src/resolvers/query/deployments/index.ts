import DATA_BASE from '@/db';
import type { IResolvers } from 'mercurius';

export const deployments: NonNullable<IResolvers['Query']>['deployments'] = ({ }, { }) => {
    return DATA_BASE.data.deployments;
};