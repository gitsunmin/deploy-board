import DATA_BASE from '@/db/deployment';
import type { Resolvers } from '@repo/typescript-config/graphql';

export const Query: Resolvers['Query'] = {
    deployments: () => {
        console.log('Fetching all deployments');
        try {
            console.log('Fetching all deployments');
            // 실제 데이터베이스나 API 호출 로직 추가
            return DATA_BASE.data.deployments;
        } catch (error) {
            console.error('Error fetching deployments:', error);
            // 빈 배열을 반환하여 non-nullable 조건을 만족
            return [];
        }
    },
};