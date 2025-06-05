import DATA_BASE from '@/db';
import type { IResolvers } from 'mercurius';

export const createDeployment: NonNullable<IResolvers['Mutation']>['createDeployment'] = async ({ }, { input }, { pubsub }) => {

    const { name, description, deployer, status, dependsOn } = input;
    const newDeployment = {
        id: `deployment_${crypto.randomUUID()}`,
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
        pubsub.publish({
            topic: 'DEPLOYMENT_CREATED',
            payload: {
                deploymentCreated: DATA_BASE.data.deployments
            }
        });

        return newDeployment;
    } catch (error) {
        console.error("Error creating deployment:", error);
        throw new Error("Failed to create deployment");
    }
}

export const deleteDeployment: NonNullable<IResolvers['Mutation']>['deleteDeployment'] = async ({ }, { id }, { pubsub }) => {
    try {
        await DATA_BASE.update(({ deployments }) => {
            const index = deployments.findIndex((dep) => dep.id === id);
            if (index !== -1) {
                deployments.splice(index, 1);
            }
            DATA_BASE.write();
        });
        console.log("Deployment deleted on mutation:", DATA_BASE.data.deployments);
        pubsub.publish({
            topic: 'DEPLOYMENT_DELETED',
            payload: {
                deploymentDeleted: DATA_BASE.data.deployments
            }
        });
        return true;
    } catch (error) {
        console.error("Error deleting deployment:", error);
        return false;
    }
}

export const updateDeployment: NonNullable<IResolvers['Mutation']>['updateDeployment'] = async ({ }, { id, input }, { pubsub }) => {
    const { name, description, deployer, status, dependsOn } = input;
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
        pubsub.publish({
            topic: 'DEPLOYMENT_UPDATED',
            payload: {
                deploymentUpdated: DATA_BASE.data.deployments
            }
        });
        if (updateDeployment === null) {
            throw new Error("Deployment not found");
        }
        return updateDeployment;
    } catch (error) {
        console.error("Error updating deployment:", error);
        throw new Error("Failed to update deployment");
    }
}