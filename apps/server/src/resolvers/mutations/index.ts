import DATA_BASE from '@/db';
import type { Resolvers } from '@repo/types/schema';
import type { PubSub } from 'graphql-subscriptions';

type Options = {
    pubSub: PubSub;
};

export const Mutation = ({ pubSub }: Options): Resolvers['Mutation'] => {
    return {
        createDeployment: async (_, { input }) => {
            const { name, description, deployer, status, dependsOn } = input;
            const newDeployment = {
                id: crypto.randomUUID(),
                name,
                description,
                deployer,
                status,
                dependsOn,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }

            try {
                DATA_BASE.update(({ deployments }) => {
                    deployments.push(newDeployment);
                    DATA_BASE.write();
                });
                console.log("New deployment created on mutation:", DATA_BASE.data.deployments);
                pubSub.publish('DEPLOYMENT_CREATED', {
                    deploymentCreated: DATA_BASE.data.deployments
                });

                return newDeployment;
            } catch (error) {
                console.error("Error creating deployment:", error);
                throw new Error("Failed to create deployment");
            }
        },
        deleteDeployment: async (_, { id }) => {
            try {
                await DATA_BASE.update(({ deployments }) => {
                    const index = deployments.findIndex((dep) => dep.id === id);
                    if (index !== -1) {
                        deployments.splice(index, 1);
                    }
                    DATA_BASE.write();
                });
                console.log("Deployment deleted on mutation:", DATA_BASE.data.deployments);
                pubSub.publish('DEPLOYMENT_DELETED', {
                    deploymentDeleted: DATA_BASE.data.deployments
                });
                return true;
            } catch (error) {
                console.error("Error deleting deployment:", error);
                return false;
            }
        },
        updateDeployment: async (_, { id, input }) => {
            const { name, description, deployer, status, dependsOn } = input;

            console.log('dependsOn:', dependsOn);
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
                            dependsOn,
                            updatedAt: new Date().toISOString(),
                        };
                        deployments[index] = updateDeployment;
                    }
                    DATA_BASE.write();
                });
                console.log("Deployment updated on mutation:", DATA_BASE.data.deployments);
                pubSub.publish('DEPLOYMENT_UPDATED', {
                    deploymentUpdated: DATA_BASE.data.deployments
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
        updateDocument: async (_, { input }) => {
            const { title, description } = input;
            try {
                await DATA_BASE.update(({ document }) => {
                    document.title = title;
                    document.description = description;
                    DATA_BASE.write();
                });
                console.log("Document updated:", DATA_BASE.data.document);
                pubSub.publish('DOCUMENT_UPDATED', {
                    documentUpdated: DATA_BASE.data.document
                });
                return DATA_BASE.data.document;
            } catch (error) {
                console.error("Error updating document:", error);
                throw new Error("Failed to update document");
            }
        },
    };
};