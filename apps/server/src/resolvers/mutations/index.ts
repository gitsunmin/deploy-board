import DATA_BASE from '@/db/deployment';
import type { Resolvers } from '@repo/types/schema';

export const Mutation: Resolvers['Mutation'] = {
    createDeployment: async (_, { input }, {}) => {
        const { name, description, deployer, status } = input;
        const newDeployment = {
            id: crypto.randomUUID(),
            name,
            description,
            deployer,
            status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        DATA_BASE.update(({ deployments }) => {
            deployments.push(newDeployment);
            DATA_BASE.write();
        });
        
        return newDeployment;
    }
};