import DATA_BASE from '@/db';
import type { IResolvers } from 'mercurius';

export const document: NonNullable<IResolvers['Query']>['document'] = async ({ }, { }) => {
    return DATA_BASE.data.document;
}