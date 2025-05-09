import DATA_BASE from '@/db/deployment';
import type { Resolvers } from '@repo/types/schema';

export const Query: Resolvers['Query'] = {
    deployments: () => {
        try {
            return DATA_BASE.data.deployments;
        } catch (error) {
            console.error('Error fetching deployments:', error);
            return [];
        }
    },
};