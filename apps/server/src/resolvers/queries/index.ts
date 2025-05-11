import DATA_BASE from '@/db';
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
    document: () => {
        try {
            console.log('Fetching document:', DATA_BASE.data.document);
            return DATA_BASE.data.document;
        } catch (error) {
            console.error('Error fetching document:', error);
            return {
                title: '',
                description: '',
            };
        }
    }

};