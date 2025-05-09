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

        try {
            DATA_BASE.update(({ deployments }) => {
                deployments.push(newDeployment);
                DATA_BASE.write();
            });
            
            return newDeployment;
        } catch (error) {
            console.error("Error creating deployment:", error);
            throw new Error("Failed to create deployment");
        }
    },
    deleteDeployment: async (_, { id }, {}) => {
        try {
            await DATA_BASE.update(({ deployments }) => {
                const index = deployments.findIndex((dep) => dep.id === id);
                if (index !== -1) {
                    deployments.splice(index, 1);
                }
                DATA_BASE.write();
            });
            return true;
        } catch (error) {
            console.error("Error deleting deployment:", error);
            return false;
        }
    },
    updateDeployment: async (_, { id, input }, {}) => {
        const { name, description, deployer, status } = input;
        try {
            let updateDeployment = null;
            await DATA_BASE.update(({ deployments }) => {
                const index = deployments.findIndex((dep) => dep.id === id);
                if (deployments[index]) {
                    updateDeployment = {
                        ...deployments[index],
                        name,
                        description,
                        deployer,
                        status,
                        updatedAt: new Date().toISOString(),
                    };
                    deployments[index] = updateDeployment;
                }
                DATA_BASE.write();
            });
            if (updateDeployment === null) {
                throw new Error("Deployment not found");
            }
            return updateDeployment;
        } catch (error) {
            console.error("Error updating deployment:", error);
            throw new Error("Failed to update deployment");
        }
    },
};